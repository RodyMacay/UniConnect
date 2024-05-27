import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }, // Referencia al modelo Usuario
});

const Auth = mongoose.model('Auth', authSchema);

export default Auth;
