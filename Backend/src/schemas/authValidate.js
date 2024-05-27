import { z } from "zod";

export const loginValidate = z.object({
  correo: z
    .string({ required_error: "email is requerid" })
    .email()
    .refine((email) => email.endsWith("@unemi.edu.ec"), {
      message: "El email debe ser @unemi.edu.ec",
    }),
  contraseña: z
    .string()
    .min(3, "password is must have more than 3 characteristics"),
});

export const registerValidate = z.object({
  nombre: z.string({ required_error: "name is required" }),
  correo: z
    .string({ required_error: "email is requerid" })
    .email()
    .refine((email) => email.endsWith("@unemi.edu.ec"), {
      message: "El email debe ser @unemi.edu.ec",
    }),
  contraseña: z
    .string({ required_error: "password is required" })
    .min(3, "password is must have more than 3 characteristics"),
});

export const usersValidate = z.object({
  nombre: z.string().min(1, { message: "name is requerid" }),
  correo: z.string().email({ message: "Ingrese un correo electrónico válido" }),
  edad: z
    .number()
    .int()
    .min(18, { message: "Debe ser mayor de 18 años" })
    .max(100, { message: "Debe ser menor de 100 años" })
    .optional(),
  ubicacion: z.string().optional(),
  genero: z.enum(["Masculino", "Femenino", "Otro"]).optional(),
  imagenPerfil: z
    .string()
    .url({ message: "La URL de la imagen de perfil no es válida" }).optional(),
  biografia: z.string().optional(),
  redesSociales: z.object({
    facebook: z
      .string()
      .url({ message: "La URL de Facebook no es válida" }).optional(),
    twitter: z
      .string()
      .url({ message: "La URL de Twitter no es válida" }).optional(),
    instagram: z
      .string()
      .url({ message: "La URL de Instagram no es válida" }).optional(),
  }),
  intereses: z.array(z.string()).optional(),
  amigos: z.array(z.string()).optional(),
  esAdmin: z.boolean().default(false),
});

export const publicacionValidation = z.object({
  titulo: z
    .string({
      required_error: "El título de la publicación es obligatorio",
    })
    .min(5, { message: "El título debe tener al menos 5 caracteres" })
    .max(100, { message: "El título no debe exceder los 100 caracteres" }),

  contenido: z
    .string({
      required_error: "El contenido de la publicación es obligatorio",
    })
    .min(10, { message: "El contenido debe tener al menos 10 caracteres" }),

  autor: z.string({
    required_error: "El autor de la publicación es obligatorio",
  }).optional(),

  fechaPublicacion: z
    .date({
      required_error: "La fecha de publicación es obligatoria",
    })
    .optional(),

  etiquetas: z
    .array(z.string())
    .max(5, { message: "No se permiten más de 5 etiquetas" })
    .optional(),

  comentarios: z
    .array(
      z.object({
        texto: z.string(),
        autor: z.string(),
        fechaComentario: z.date(),
      })
    )
    .optional(),

  comunidad: z.string({
    required_error: "La comunidad de la publicación es obligatoria",
  }).optional(),

  nombreComunidad: z
    .string({
      required_error: "El nombre de la comunidad es obligatorio",
    })
    .min(3, {
      message: "El nombre de la comunidad debe tener al menos 3 caracteres",
    }).optional(),

  meGusta: z.array(z.string()).optional(),

  compartidoPor: z.string().optional(),

  imagenAdjunta: z
    .string()
    .url({
      message: "Debe ingresar una URL válida para la imagen adjunta",
    })
    .optional(),

  enlaceExterno: z
    .string()
    .url({
      message: "Debe ingresar una URL válida para el enlace externo",
    })
    .optional(),

  visitas: z
    .number()
    .int()
    .min(0, { message: "El número de visitas no puede ser negativo" })
    .optional(),

  duracionLectura: z
    .number()
    .positive({
      message: "La duración de lectura debe ser un número positivo",
    })
    .optional(),

  archivada: z.boolean().optional(),

  destacada: z.boolean().optional(),
});

export const comunidadValidation = z.object({
  nombre_comunidad: z
    .string({
      required_error: "El nombre de la comunidad es obligatorio",
    })
    .min(3, {
      message: "El nombre de la comunidad debe tener al menos 3 caracteres",
    })
    .max(50, {
      message: "El nombre de la comunidad no debe exceder los 50 caracteres",
    }),

  descripcion: z
    .string({
      required_error: "La descripción de la comunidad es obligatoria",
    })
    .min(10, {
      message:
        "La descripción de la comunidad debe tener al menos 10 caracteres",
    })
    .max(200, {
      message:
        "La descripción de la comunidad no debe exceder los 200 caracteres",
    }),

  creador: z.string({
    required_error: "El creador de la comunidad es obligatorio",
  }).optional(),

  nombre_creador: z.string().optional(),

  miembros: z.array(z.string()).optional(),

  fechaCreacion: z.date().optional(),

  publicaciones: z.array(z.string()).optional(),

  categoria: z
    .string({
      required_error: "La categoría de la comunidad es obligatoria",
    })
    .min(3, {
      message: "El nombre de la categoría debe tener al menos 3 caracteres",
    })
    .max(30, {
      message: "El nombre de la categoría no debe exceder los 30 caracteres",
    }),

  // Otras propiedades del esquema
});