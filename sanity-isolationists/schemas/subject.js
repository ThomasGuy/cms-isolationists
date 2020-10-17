import { MdSubject as icon } from 'react-icons/md';

export default {
  // Computer name
  name: 'subject',
  //  visible name
  title: 'Subject',
  icon,
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Subject',
      type: 'string',
      description: 'This weeks subject',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'week',
      title: 'Week',
      type: 'number',
      decription: 'This weeks number',
      validation: (Rule) => Rule.required().min(1),
    },
  ],
};
