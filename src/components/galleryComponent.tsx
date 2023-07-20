import React, { useState, useEffect } from 'react';
import { Galleria, GalleriaResponsiveOptions } from 'primereact/galleria';
import { PhotoService } from './PhotoService';
import { max } from 'date-fns/esm';

const AutoPlayDemo: React.FC = () => {
  const [images, setImages] = useState<Array<any>>([]); // Asegúrate de ajustar el tipo de datos según tu definición de ImageData
  

  useEffect(() => {
    PhotoService.getImages().then((data) => setImages(data));
  }, []);

  const itemTemplate = (item: any) => {
    return <img src={item.itemImageSrc} alt={item.alt} className='object-contain h-100' />;
  };


  return (
    <div className="card">
      <Galleria
        value={images}
        numVisible={5}
        circular
        style={{ maxWidth: '540px' }}
        item={itemTemplate}
        showThumbnails={false}
        autoPlay
        transitionInterval={2000}
        className='container justify-center'
      />
    </div>
  );
};

export default AutoPlayDemo;
