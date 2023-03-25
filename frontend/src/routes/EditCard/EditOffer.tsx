import React, { useState, useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import './EditOffer.scss';
import { Offer, OfferType } from '../../types';
import Button from '../../components/Button';
import apiService from '../../api.service';
import { API_BASE_URL, SERVER_URL } from '../../constants';
import notification from '../../contexts/notification';

const EditOffer = () => {
  const navigate = useNavigate();
  const { success, error } = useContext(notification);
  const [offer, updateOffer] = useState(useLoaderData() as Offer);
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
  const baseUrl = `${API_BASE_URL}/offers`;
  const mainImage = offer.images.length
    ? `${SERVER_URL}offers/${offer.id}/${offer.images[0]}`
    : undefined;

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event?.preventDefault();

    const selectedFiles = event.target.files;

    if (!selectedFiles) {
      return;
    }

    const promises: Promise<string>[] = [];
    const { images } = offer;

    Array.from(selectedFiles).forEach(file => {
      if (offer.images.includes(file.name)) {
        return;
      }

      images.push(file.name);

      if (offer.id) {
        promises.push(apiService.uploadFile(offer.id, file));
      } else {
        files.push(file);
      }
    });

    if (promises.length) {
      const uploadedImages = await Promise.all(promises);

      updateOffer({
        ...offer,
        images: [...offer.images, ...uploadedImages],
      });
      save()
        .then(() => {
          success('Images succesfully uploaded'), 'Upload successfull';
        })
        .catch(e => {
          error(e.message, 'Failed to upload image');
        });
    }
  };
  const createNewOffer = async () => {
    const promises: Promise<string>[] = [];

    try {
      const newOffer = (await apiService.post('offers', offer)).data.offer;

      updateOffer(newOffer);

      files.forEach(file => {
        promises.push(apiService.uploadFile(newOffer.id, file));
        updateOffer({
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
  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    offer.id ? saveAndExist() : createNewOffer();
  };
  const goBack = (event?: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    navigate('/');
  };
  const saveAndExist = () => {
    save().then(() => {
      success('Your changes have been succesfully saved');
      goBack();
    });
  };
  const updateDays = (day: string) => {
    const { daysOfTheWeek } = offer;
    const i = daysOfTheWeek.findIndex(d => d === day);

    if (i > -1) {
      daysOfTheWeek.splice(i, 1);
    } else {
      daysOfTheWeek.push(day);
    }

    updateOffer({
      ...offer,
      daysOfTheWeek,
    });
  };
  const parseImageUrls = () => {
    if (files.length) {
      return files.map(file => URL.createObjectURL(file));
    }

    const { images, id } = offer;

    return images.map(name => `${SERVER_URL}offers/${id}/${name}`);
  };
  const deleteOffer = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await apiService.delete(`${baseUrl}/${offer.id}`);
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
    return apiService.put(`${baseUrl}/${offer.id}`, offer).then(({ data }) => {
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

    updateOffer({
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
  const deleteFile = async (i: number) => {
    if (files.length) {
      files.splice(i, 1);
      return;
    }

    const { images } = offer;
    const filename = images.splice(i, 1).pop();

    updateOffer({
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

  return (
    <div className=''>
      <div className='edit-offer' data-testid='edit-offer'>
        <div className='content'>
          <form id='offer-form' onSubmit={onSubmitForm}>
            <div className='form-control title'>
              <label>Title:</label>
              <input
                value={offer.title}
                onChange={e =>
                  updateOffer({
                    ...offer,
                    title: e.target.value,
                  })
                }
                placeholder='Offer name'
                required
              />
            </div>
            <div className='form-control date'>
              <label>Date:</label>{' '}
              <input
                value={`${offer.date}`}
                onChange={e =>
                  updateOffer({
                    ...offer,
                    date: new Date(e.target.value),
                  })
                }
                type='date'
                placeholder='Offer Date'
              />
            </div>
            <div className='form-control offer-type'>
              <label>Offer </label>
              <select
                onChange={e =>
                  updateOffer({
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
            <div className='days-of-the-week'>
              {daysOfTheWeek.map(day => (
                <label key={day}>
                  {day}
                  <input
                    type='checkbox'
                    checked={offer.daysOfTheWeek.includes(day)}
                    onChange={() => updateDays(day)}
                  />
                </label>
              ))}
            </div>
            <div className='form-control description'>
              Description
              <textarea
                value={offer.description}
                placeholder='Offer description'
                rows={10}
                onChange={e =>
                  updateOffer({
                    ...offer,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <div className='form-control price'>
              <label>Unit price </label>
              <input
                value={offer.price}
                onChange={e =>
                  updateOffer({
                    ...offer,
                    price: e.target.value,
                  })
                }
                type='number'
                placeholder='Unit price'
                step='500'
                required
              />
            </div>
            <div className='actions'>
              <Button onClick={goBack}>back</Button>
              <Button type='submit'>save</Button>
            </div>
          </form>
          {!isNew && (
            <Button
              buttonType='error'
              outlined
              className='full'
              onClick={deleteOffer}
            >
              Delete &lsquo;{offer.title}&lsquo;
            </Button>
          )}
        </div>
        <div className='image'>
          {mainImage && <img src={mainImage} alt={offer.title} />}
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
        </div>
      </div>
      <h3>Gallery</h3>
      <hr />
      <div className='slider'>
        <div className='slide image-placeholder'>
          <Button onClick={() => imgInput.current?.click()}>Add Image</Button>
        </div>
        {parseImageUrls().map((img, i) => (
          <div key={i} className='slide'>
            <figure>
              <img src={img} alt={offer.title} />
              <Button className='set-default' onClick={() => setDefault(i)}>
                Set default
              </Button>
              <span
                title='delete this photo'
                className='delete-button Button error'
                onClick={() => deleteFile(i)}
              >
                X
              </span>
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditOffer;
