import { FC } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

interface Props {
  images: string[];
}

export const ProductSlideshow: FC<Props> = ({ images }) => {
  return (
    <Slide easing='ease' duration={7 * 1000} indicators>
      {images.map((img) => {
        const url = `/products/${img}`;

        return (
          <div key={img}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '400px',
                backgroundImage: `url(${url})`,
                backgroundSize: 'cover',
              }}
            />
          </div>
        );
      })}
    </Slide>
  );
};
