import mongoose from 'mongoose';

export async function CONNECTMONGOdb(url) {
    return mongoose.connect(url);
}