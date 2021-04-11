import { AiOutlinePicture as icon } from 'react-icons/ai';
// eslint-disable-next-line import/no-unresolved
import sanityClient from 'part:@sanity/base/client';

const client = sanityClient.withConfig({
  apiVersion: '2021-04-01',
});

export default {
  // Computer name
  name: 'picture',
  //  visible name
  title: 'Picture',
  icon,
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'artist',
      title: 'Artist',
      type: 'reference',
      to: [{ type: 'artist' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'subject',
      title: 'Subject',
      type: 'reference',
      to: [{ type: 'subject' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'sold',
      title: 'Sold',
      type: 'boolean',
      options: {
        layout: 'checkbox',
      },
      description: 'Mark this picture as sold',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: async doc => {
          const subject = await client.getDocument(doc.subject._ref);
          const artist = await client.getDocument(doc.artist._ref);
          return `${subject.name}-by-${artist.name}`;
        },
        maxLength: 150,
      },
    },
    {
      name: 'dimensions',
      title: 'Image dimensions',
      type: 'dimensions',
      description: 'Image dimensions',
    },
  ],
  preview: {
    select: {
      artist: 'artist.name',
      media: 'image',
    },
    prepare({ artist, media }) {
      return {
        title: artist,
        media,
      };
    },
  },
};
