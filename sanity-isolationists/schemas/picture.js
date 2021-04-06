import { AiOutlinePicture as icon } from 'react-icons/ai';
// import client from 'part:@sanity/base/client';

export default {
  // Computer name
  name: 'picture',
  //  visible name
  title: 'Picture',
  icon,
  type: 'object',
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
    // {
    //   name: 'slug',
    //   title: 'Slug',
    //   type: 'slug',
    //   options: {
    //     source: async doc => {
    //       if (!doc.subject) {
    //         return doc.title;
    //       }
    //       const subject = await client.getDocument(doc.subject._ref);
    //       const artist = await client.getDocument(doc.artist._ref);
    //       return `${subject.name}-by-${artist.name}`;
    //     },
    //     maxLength: 150,
    //   },
    // },
    {
      name: 'dimensions',
      title: 'Image dimensions',
      type: 'dimensions',
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
