import { BiPalette as icon } from 'react-icons/bi';

export default {
  // Computer name
  name: 'artist',
  //  visible name
  title: 'Artist',
  icon,
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Artists name',
      type: 'string',
      description: 'Artist full name',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'education',
      title: 'Honors',
      type: 'string',
      decription: 'qualifications/degrees',
    },
    {
      name: 'email',
      title: 'email',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'mug',
      title: 'Mug Shot',
      type: 'image',
      decription: 'Artists Photo',
      validation: Rule => Rule.required(),
      options: {
        hotspot: true,
      },
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      decription: 'College degrees',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Biography',
      name: 'biography',
      description: 'Enter Biography paragraph by paragraph',
      validation: Rule => Rule.required(),
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'links',
      title: 'Website Links',
      type: 'array',
      of: [{ type: 'link' }],
    },
    {
      title: 'Social Media',
      name: 'social',
      type: 'social',
    },
  ],
};
