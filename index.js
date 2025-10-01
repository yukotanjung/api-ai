import express from "express";
import cors from 'cors';
import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';
import multer from "multer";


const app = express();
const port = 3000

const ai = new GoogleGenAI({})

//app.use(cors())
//app.use(multer())
app.use(express.json())


app.post('/chat', async (req, res) => {
    const {body} = req
    const {prompt} = body

    if(!prompt || typeof prompt !== "string"){
        res.status(400).json({
            message : "Prompt harus diisi",
            data: null,
            success: false
        })

        return
    }

    try {

        const aiResponse = await ai.models.generateContent({
            model : 'gemini-2.5-flash',
            contents: [
                {
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ]
        })

        res.status(200).json({
            success : true,
            data: aiResponse.text,
            message: 'Berhasil'
        })
        
    } catch (error) {
        console.error(e);
        res.status(500).json({
            success: false,
            data: null,
            message: e.message
        })
        
    }


 })

 app.listen(port,() =>{
    console.log('running server with port ' + port);
})