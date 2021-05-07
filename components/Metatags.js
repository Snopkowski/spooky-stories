import Head from 'next/head';

export default function Metatags({
  title = 'Spooky Stories',
  description = 'Spooky description!',
}) {
  return (
    <Head>
      <title>{title} | A company.com</title>
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:site' content='@acompany' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
    </Head>
  );
}
