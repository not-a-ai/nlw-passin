import fastify from "fastify";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";

import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { createEvent } from "./routes/create.event";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";
import { checkIn } from "./routes/check-in";
import { getEventAttendees } from "./routes/get-event-attendees";

const app = fastify();

app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: 'pass-in',
      description: 'Especificação da API para backend da aplicação pass-in construida no evento NLW Unite da Rockeseat',
      version: '1.0.0'
    }
  },
  //para interpretar o json produzido pelo zod
  transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);;
app.register(checkIn);
app.register(getEventAttendees);

app.listen({ port: 3333}).then(() => {
  console.log('listening on port 3333');
})