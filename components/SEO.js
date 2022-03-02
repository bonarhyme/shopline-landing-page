import Head from "next/head";
import { useRouter } from "next/router";
import { appData } from "../variables/data";

export const CommonSEO = ({ title, description, ogType, ogImage, twImage }) => {
  const router = useRouter();
  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={description} />
      <meta property="og:url" content={`${appData.siteUrl}${router.asPath}`} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={appData.title} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      {ogImage.constructor.name === "Array" ? (
        ogImage.map(({ url }) => (
          <meta property="og:image" content={url} key={url} />
        ))
      ) : (
        <meta property="og:image" content={ogImage} key={ogImage} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={appData.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twImage} />
    </Head>
  );
};

export const PageSEO = ({ title, description }) => {
  const ogImageUrl = appData.socialBanner;
  const twImageUrl = appData.socialBanner;

  return (
    <CommonSEO
      title={title}
      description={description}
      ogType="website"
      ogImage={ogImageUrl}
      twImage={twImageUrl}
    />
  );
};

export const BlogSEO = ({
  authorDetails,
  title,
  subTitle,
  date,
  lastMod,
  url,
  images = [],
}) => {
  const router = useRouter();
  const publishedAt = new Date(date).toDateString();
  const modifiedAt = new Date(lastMod || date).toDateString();
  let imagesArr =
    images.length === 0
      ? [appData.socialBanner]
      : typeof images === "string"
      ? [images]
      : images;

  //   This should point to the images on the blog
  const featuredImages = imagesArr.map((img) => {
    return {
      "@type": "ImageObject",
      url: img,
    };
  });

  let authorList;

  if (authorDetails) {
    authorList = {
      "@type": "Person",
      name: authorDetails.username,
    };
  } else {
    authorList = {
      "@type": "Person",
      name: appData.author,
    };
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: title,
    image: featuredImages,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: authorList,
    publisher: {
      "@type": "Organization",
      name: appData.author,
      logo: {
        "@type": "ImageObject",
        url: appData.siteLogo,
      },
    },
    description: subTitle,
  };

  const twImageUrl = featuredImages[0].url;

  return (
    <>
      <CommonSEO
        title={title}
        description={subTitle}
        ogType="article"
        ogImage={featuredImages}
        twImage={twImageUrl}
      />

      <Head>
        {date && (
          <meta property="article:published_time" content={publishedAt} />
        )}
        {lastMod && (
          <meta property="article:modified_time" content={modifiedAt} />
        )}
        <link rel="canonical" href={`${appData.siteUrl}${router.asPath}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2),
          }}
        />
      </Head>
    </>
  );
};
