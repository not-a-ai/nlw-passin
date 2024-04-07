import { z } from 'zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { prisma } from '../lib/prisma';
import { FastifyInstance } from 'fastify';


export async function registerForEvent(app: FastifyInstance) {
app
.withTypeProvider<ZodTypeProvider>()
.post('/events/:eventId/attendees', { 
  schema: {
    body: z.object({
      name: z.string().min(4),
      email: z.string().email(),
    }),
    params: z.object({
      eventId: z.string().uuid(),
    }),
    response: {
      201: z.object({
        attendeeId: z.number(),
      })
    }
  }
}, async (req, res) => {
  const { eventId } = req.params;
  const { name, email } = req.body;

  const attendeesFromEmail = await prisma.attendee.findUnique({
    where: { eventId_email: {
      email,
      eventId
      } 
    }
  })

  if (attendeesFromEmail !== null) {
    throw new Error('This email is already registered for thid event')
  }
    
  const [event,amountOfAttendeesForEvent] = await Promise.all([
      prisma.event.findUnique({
        where: { 
          id: eventId,
        }
      }),
      prisma.attendee.count({
        where: { eventId }
      })
    ])

    
  if (event?.maximumAttendees && amountOfAttendeesForEvent >= event.maximumAttendees) {
    throw new Error('The maximun number of attendees for this event has been reached')
  }

  const attendee = await prisma.attendee.create({
    data: {
      name,
      email,
      eventId
    }
  })


  return res.status(201).send({ attendeeId: attendee.id })
})

}
