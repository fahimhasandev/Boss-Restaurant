import { Parallax } from 'react-parallax';

const Cover = ({ img, title, para }) => {
  return (
    <Parallax
      blur={{ min: -50, max: 50 }}
      bgImage={img}
      bgImageAlt={title}
      strength={-200}
    >
      <div className='hero h-[700px] mb-20'>
        <div className='text-neutral-content text-center'>
          <div className='bg-[#151515] h-[400px] flex flex-col justify-center py-[145px] px-[400px] bg-opacity-70'>
            <h1 className='mb-5 text-5xl font-bold uppercase'>{title}</h1>
            <p className='mb-5'>{para}</p>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default Cover;
