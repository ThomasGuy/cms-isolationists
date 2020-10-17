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
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'education',
      title: 'Hons',
      type: 'string',
      decription: 'College',
    },
    {
      name: 'email',
      title: 'email',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
};
