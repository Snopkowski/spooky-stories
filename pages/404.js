import Link from 'next/link';

export default function Custom404() {
  return (
    <main>
      <h1>404 - That page does not exist...</h1>
      <iframe
        src='https://giphy.com/embed/UoeaPqYrimha6rdTFV'
        width='600'
        height='462'
        frameBorder='0'
        allowFullScreen
      ></iframe>
      <Link href='/'>
        <button className='btn-blue'>Go home</button>
      </Link>
    </main>
  );
}
