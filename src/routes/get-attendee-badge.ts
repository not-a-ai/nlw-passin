import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { emit, emitWarning } from "process";

export async function getAttendeeBadge(app: FastifyInstance) {
  app
  .withTypeProvider<ZodTypeProvider> ()
  .get('/attendees/:attendeeId/badge', {
    schema: {
      params: z.object({
        attendeeId: z.coerce.number().int(),
      }),
      summary: 'Get an attendee badge',
      tags: ['attendees'],
      response: {
        200: z.object({
          badge: z.object({
            name: z.string(),
            email: z.string().email(),
            eventTitle: z.string(),
            checkInUrl: z.string().url(),
          })
        })
      },
    }
  }, async (req, res) => {
    const { attendeeId } = req.params;

    const attendee = await prisma.attendee.findUnique({
      select: {
        name: true,
        email: true,
        event: {
          select: {
            title: true,
          }
        }
      },
      where: {
        id: attendeeId,
      }
    })
    if (attendee === null) {
      throw new Error('Attendee not found')
    }
  
    const baseUrl = `${req.protocol}://${req.hostname}`
    const checkInUrl = new URL(`/attendees/${attendeeId}/check-in`, baseUrl )
    return res.send({ 
      badge: {
        name: attendee.name,
        email: attendee.email,
        eventTitle: attendee.event.title,
        checkInUrl: checkInUrl.toString(),

      }
     })
  })
}