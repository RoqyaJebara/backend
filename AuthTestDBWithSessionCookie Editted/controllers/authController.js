import UserModel from '../models/userModel.js';
import { registerSchema, loginSchema, changePasswordSchema } from '../utils/validation.js';

const AuthController = {
  async register(req, res, next) {
    try {
      const { error, value } = registerSchema.validate(req.body);
      if (error) throw new Error(error.details[0].message);

      const { email, password, name } = value;
      
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) throw new Error('Email already in use');

      const newUser = await UserModel.create({ email, password, name });
      const token = UserModel.generateToken(user.id);
            
      req.session.userId = newUser.id;
      req.session.authenticated=true;
       res.cookie('token',token,{
          httpOnly:true,
          secure:process.env.NODE_ENV === 'production',
          maxAge: 24* 60 * 60 *1000, 
          sameSite:'strict',

     });
      res.status(201).json({
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.created_at
        }
      });
       
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) throw new Error(error.details[0].message);

      const { email, password } = value;
      
      const user = await UserModel.findByEmail(email);
      if (!user) throw new Error('Invalid credentials');

      const isMatch = await UserModel.verifyPassword(password, user.password);
      if (!isMatch) throw new Error('Invalid credentials');


      //creat the session 

      // req.session.userId = user.id;
      // req.session.authenticated =true;

      const token = UserModel.generateToken(user.id);
     //set this token insied the cookie
     res.cookie('token',token,{
          httpOnly:true,
          secure:process.env.NODE_ENV === 'production',
          maxAge: 24* 60 * 60 *1000, 
          sameSite:'strict',

     });
      
      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      next(error);
    }
  },

  async getMe(req, res, next) {
    try {
      const user = await UserModel.findById(req.user.id);
      if (!user) throw new Error('User not found');

      res.json({
        success: true,
        user
      });
    } catch (error) {
      next(error);
    }
  },

  async changePassword(req, res, next) {
    try {
      const { error, value } = changePasswordSchema.validate(req.body);
      if (error) throw new Error(error.details[0].message);

      const { currentPassword, newPassword } = value;
      const user = await UserModel.findByEmail(req.user.email);

      const isMatch = await UserModel.verifyPassword(currentPassword, user.password);
      if (!isMatch) throw new Error('Current password is incorrect');

      await UserModel.updatePassword(req.user.id, newPassword);

      res.json({
        success: true,
        message: 'Password updated successfully'
      });
    } catch (error) {
      next(error);
    }
  },

  //mehtode for logout 
//destroy the session and clear value in cookies
  async logout(req,res,next){
    try{
      req.session.destroy(err =>{
        if(err) throw err;
      });
     res.clearCookie('token');
     res.clearCookie('connect.sid');
     res.json({success:true,message:'logged out '})
    }catch(error){}
  }
};

export default AuthController;
   //get the data 
    //make validate the data that i get form body in utils validation.js
    //if the passwaord does not mathch the user passowrd