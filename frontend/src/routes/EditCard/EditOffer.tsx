import React, { useState, useContext, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import './EditOffer.scss';
import { Offer, OfferType } from '../../types';
import { Button, Input } from '@fabrigeas/react-components';
import apiService from '../../api.service';
import notification from '../../contexts/notification';
import { IMAGE_BASE_URL } from '../../constants';

const EditOffer = () => {
  const navigate = useNavigate();
  const { success, error } = useContext(notification);
  const [offer, setOffer] = useState(useLoaderData() as Offer);
  const [files, setFiles] = useState<File[]>([]);
  const isNew = offer.id === undefined;
  const imgInput = React.useRef<HTMLInputElement>(null);
  const offerTypes = [
    'food',
    'drink',
    'fruit',
    'salad',
    'today',
  ] as OfferType[];
  const daysOfTheWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const mainImage = files.length
    ? URL.createObjectURL(files[0])
    : offer.images.length
    ? `${IMAGE_BASE_URL}${offer.images[0]}`
    : undefined;
  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event?.preventDefault();

    const selectedFiles = event.target.files;

    if (!selectedFiles) {
      return;
    }

    const promises: Promise<string>[] = [];

    Array.from(selectedFiles).forEach(file => {
      if (offer.images.includes(file.name)) {
        return;
      }

      offer.images.push(file.name);

      if (offer.id) {
        promises.push(apiService.uploadFile(offer.id, file));
      } else {
        files.push(file);
        setFiles([...files, file]);
      }
    });

    if (promises.length) {
      const uploadedImages = await Promise.all(promises);

      setOffer({
        ...offer,
        images: [...offer.images, ...uploadedImages],
      });
      save()
        .then(() => {
          success('Images succesfully uploaded', 'Upload successfull');
        })
        .catch(e => {
          error(e.message, 'Failed to upload image');
        });
    }
  };
  const saveAndExist = () => {
    save().then(() => {
      success('Your changes have been succesfully saved');
      goBack();
    });
  };
  const saveNewOffer = async () => {
    const promises: Promise<string>[] = [];

    try {
      const newOffer = (await apiService.post('offers', offer)).data.offer;

      setOffer(newOffer);

      files.forEach(file => {
        promises.push(apiService.uploadFile(newOffer.id, file));
        setOffer({
          ...offer,
          images: [...offer.images, file.name],
        });
      });

      await Promise.all(promises).then(() => {
        navigate(`/offer/${newOffer.id}`);
      });
    } catch (e) {
      error('Failed to create offer', e as string);
    }
  };
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    offer.id ? saveAndExist() : saveNewOffer();
  };
  const goBack = (event?: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    navigate('/');
  };
  const updateDays = (day: string) => {
    const { daysOfTheWeek } = offer;
    const i = daysOfTheWeek.findIndex(d => d === day);

    if (i > -1) {
      daysOfTheWeek.splice(i, 1);
    } else {
      daysOfTheWeek.push(day);
    }

    setOffer({
      ...offer,
      daysOfTheWeek,
    });
  };
  const deleteOffer = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await apiService.delete(offer.id);
      success(
        `${offer.title} has been succesfully deleted`,
        'Delete succesfull'
      );

      await apiService.deleteFile(offer.id, undefined).then(() => {
        success(
          `${offer.title} images have been succesfully deleted`,
          'Delete succesfull'
        );

        navigate('/offers/food');
      });
    } catch (e) {
      error('Delete Failed', e as string);
    } finally {
      goBack();
    }
  };
  const save = (): Promise<Offer> => {
    return apiService.put(offer.id, offer).then(({ data }) => {
      setOffer(data.offer);
      return data.offer;
    });
  };
  const setDefault = (i: number) => {
    if (files.length) {
      [files[0], files[i]] = [files[i], files[0]];
      setFiles({ ...files });
      return;
    }

    const { images } = offer;

    [images[0], images[i]] = [images[i], images[0]];

    setOffer({
      ...offer,
      images,
    });

    save()
      .then(() => {
        success('Default image has been changed', 'Update succesfull');
      })
      .catch(e => {
        error('Failed to set default image', e);
      });
  };
  const deleteFile = async (i: number, file: File | string) => {
    if (files.length) {
      files.splice(i, 1);
      return;
    }

    const { images } = offer;
    const filename = images.splice(i, 1).pop();

    setOffer({
      ...offer,
      images,
    });

    await apiService.deleteFile(offer.id, filename);

    save()
      .then(() => {
        success(`${filename} as been succesfully deleted`, 'File deleted');
      })
      .catch(e => {
        error('Failed to delete file', e.message);
      });
  };

  const Gallery = ({ files }: { files: Array<string | File> }): JSX.Element => (
    <div className='slider'>
      {files.map((file, i) => {
        const isFile = typeof file !== 'string';
        const alt = isFile ? file.name : file;
        const url = isFile
          ? URL.createObjectURL(file)
          : `${IMAGE_BASE_URL}${file}`;

        return (
          <figure style={{ margin: 'auto' }} key={i} className='slide'>
            <img
              src={url}
              alt={alt}
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'contain',
              }}
            />
            <Button className='set-default' onClick={() => setDefault(i)}>
              Set default
            </Button>
            <span
              title='delete this photo'
              className='delete-button Button error'
              onClick={() => deleteFile(i, file)}
            >
              X
            </span>
          </figure>
        );
      })}
    </div>
  );

  return (
    <div className='edit-offer-container'>
      <div className='edit-offer' data-testid='edit-offer'>
        <div className='content'>
          <form id='offer-form' onSubmit={submitForm}>
            <Input
              label='Offer title:'
              value={offer.title}
              isValid={offer.title.length > 2}
              onChange={e =>
                setOffer({
                  ...offer,
                  title: e.target.value,
                })
              }
              required
            />
            <div className='form-control' style={{ marginTop: '1rem' }}>
              <label>Offer type</label>
              <select
                onChange={e =>
                  setOffer({
                    ...offer,
                    offerType: e.target.value as OfferType,
                  })
                }
              >
                {offerTypes.map(offerType => (
                  <option key={offerType} value={offerType}>
                    {offerType}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label='Offer description:'
              value={offer.description}
              rows={10}
              textarea
              onChange={e =>
                setOffer({
                  ...offer,
                  description: e.target.value,
                })
              }
            />
            <Input
              label='Unit price:'
              value={offer.price}
              onChange={e =>
                setOffer({
                  ...offer,
                  price: e.target.value,
                })
              }
              type='number'
              placeholder='Unit price'
              step='500'
              required
            />
            <div className='actions'>
              <Button outlined onClick={goBack}>
                back
              </Button>
              <Button outlined type='submit'>
                save
              </Button>
            </div>
          </form>
        </div>
      </div>
      <fieldset form='offer-form' style={{ marginBottom: '0.5rem' }}>
        <legend>Gallery</legend>
        {offer.images.length ? (
          <>
            <Button
              className='add-photos-button'
              onClick={() => imgInput.current?.click()}
            >
              Add Photos
            </Button>
            <hr />
          </>
        ) : null}
        <input
          ref={imgInput}
          type='file'
          placeholder='Click to select image'
          accept='image/*'
          multiple={true}
          form='offer-form'
          required={mainImage === undefined}
          hidden={mainImage !== undefined}
          onChange={onImageChange}
        />
        {mainImage ? (
          <div className='image'>
            <img src={mainImage} alt={offer.title} />
          </div>
        ) : null}
        {files.length ? (
          <Gallery files={files} />
        ) : (
          <Gallery files={offer.images} />
        )}
      </fieldset>
      {!isNew ? (
        <Button
          buttonType='error'
          outlined
          className='full'
          onClick={deleteOffer}
        >
          Delete &lsquo;{offer.title}&lsquo;
        </Button>
      ) : null}
    </div>
  );
};

export default EditOffer;
