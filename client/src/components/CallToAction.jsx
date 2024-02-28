import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Check out my projects !
            </h2>
            
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href="https://github.com/Abinavkrishnaa"  rel='noopener noreferrer'>
                    GitHub
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://d3kqdc25i4tl0t.cloudfront.net/articles/content/fbcd33859f5566908eabadc6cfb27228_hero.jpeg" />
        </div>
    </div>
  )
}