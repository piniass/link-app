import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name: "dltxpt5dx",
    api_key: "847737732951657",
    api_secret: "7cvzVf7tw3QO85fYoq6RbSUuBF0",
})

export const uploadImage = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'avatar'
    });
};

