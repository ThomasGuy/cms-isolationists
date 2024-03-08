import { AiOutlinePicture as icon } from 'react-icons/ai';
import {defineField, defineType} from 'sanity'
import clientConfig from '../sanity'
// eslint-disable-next-line import/no-unresolved

const client = {
  ...clientConfig,
  apiVersion: '2021-04-01'
}

export default defineType({
  name: 'picture',
  title: 'Picture',
  icon,
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'reference',
      to: [{ type: 'artist' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'reference',
      to: [{ type: 'subject' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'pictureTitle',
      title: 'Picture Title (optional)',
      type: 'string',
    }),
    defineField({
      name: 'sold',
      title: 'Sold',
      type: 'boolean',
      options: {
        layout: 'checkbox',
      },
      description: 'Mark this picture as sold',
    }),
    defineField({
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
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'dimensions',
      title: 'Image dimensions',
      type: 'dimensions',
      description: 'Image dimensions',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: 'Artist name',
      name: 'artist',
      by: [{ field: 'artist.name', direction: 'asc' }],
    },
    {
      title: 'Subject week desc',
      name: 'subject',
      by: [{ field: 'subject.week', direction: 'desc' }],
    },
    {
      title: 'Subject name desc',
      name: 'subject',
      by: [{ field: 'subject.name', direction: 'desc' }],
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
        title: `${artist} - ${week}. ${subject}`,
        media,
      };
    },
  },
});
