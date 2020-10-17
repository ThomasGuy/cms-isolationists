import client from 'part:@sanity/base/client';
import { AiOutlinePicture as icon } from 'react-icons/ai';

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
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'artist',
      title: 'Artist',
      type: 'reference',
      to: [{ type: 'artist' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subject',
      title: 'Subject',
      type: 'reference',
      to: [{ type: 'subject' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: async (doc) => {
          if (!doc.subject) {
            return doc.title;
          }
          const subject = await client.getDocument(doc.subject._ref);
          const artist = await client.getDocument(doc.artist._ref);
          return `${subject.name}-by-${artist.name}`;
        },
        maxLength: 150,
      },
    },
    {
      name: 'width',
      title: 'Width',
      type: 'number',
    },
    {
      name: 'height',
      title: 'Height',
      type: 'number',
    },
  ],
  preview: {
    select: {
      artist: 'artist.name',
      subject: 'subject.name',
      week: 'subject.week',
      media: 'image',
    },
    prepare({ artist, subject, week, media }) {
      return {
        title: `${week}. ${artist} - ${subject}`,
        media,
      };
    },
  },
};
