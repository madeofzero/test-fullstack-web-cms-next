import type { CollectionConfig } from 'payload'
import { decrypt, encrypt, isEncrypted } from '../lib/crypto'

export const QuizAttempts: CollectionConfig = {
  slug: 'quiz-attempts',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'totalScore', 'resultLabel', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data || typeof data.notes !== 'string' || !data.notes.length) return data

        if (!isEncrypted(data.notes)) {
          data.notes = encrypt(data.notes)
        }

        return data
      },
    ],
    afterRead: [
      ({ doc }) => {
        if (!doc || typeof doc.notes !== 'string' || !doc.notes.length) return doc
        doc.notes = decrypt(doc.notes)
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: false,
      index: true,
    },
    {
      name: 'quiz',
      type: 'relationship',
      relationTo: 'quizzes' as any,
      required: false,
    },
    {
      name: 'answers',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'questionId',
          type: 'number',
          required: true,
        },
        {
          name: 'selectedLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'selectedScore',
          type: 'number',
          required: true,
          min: 0,
          max: 3,
        },
      ],
    },
    {
      name: 'totalScore',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'resultLabel',
      type: 'text',
      required: true,
    },
    {
      name: 'notes',
      type: 'textarea',
      required: false,
    },
  ],
}
