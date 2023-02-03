import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client= sanityClient ({
    projectId: 'c80sqx76',//process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion:"2022-03-10" ,
    useCdn:true,
    token: process.env.REACT_APP_SANITY_TOKEN,
    ignoreBrowserTokenWarning: true
});

const builder =imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source); 