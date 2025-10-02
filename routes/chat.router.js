import { Router } from "express"
import { GoogleGenAI } from "@google/genai";
const chatRouter = Router()
import { body, validationResult, check } from "express-validator";
import multer from "multer";
import fs from "fs/promises"


const ai = new GoogleGenAI({})
const upload = multer()

function extractText(res) {
    try {

        const text = 
            res?.response?.candidates?.[0]?.content?.parts?.[0]?.text ??
            res?.candidates?.[0]?.content?.parts?.[0]?.text ??
            res?.response?.candidates?.[0]?.content?.text

        
        return text ?? JSON.stringify(res, null, 2)
        
    } catch (error) {
        console.error("Error extrat", error.message);

        return JSON.stringify(res, null, 2)
        
    }
}

chatRouter.post("/",
    check('prompt').notEmpty().withMessage('Prompt must be filled'),  
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const {body} = req
        const {prompt} = body


        try {

            const aiResponse = await ai.models.generateContent({
                model : process.env.GEMINI_MODEL,
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
            console.error(error);
            res.status(500).json({
                success: false,
                data: null,
                message: error.message
            })
            
        }
})

// Generate Text
chatRouter.post("/generate-text", 
    check('prompt').notEmpty().withMessage('Prompt must be filled'),  
    async(req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

    try {

        const {body} = req
        const {prompt} = body

        const aiResponse = await ai.models.generateContent({
            model : process.env.GEMINI_MODEL,
            contents : [
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
            data : extractText(aiResponse)
        })

        
        
    } catch (error) {
        res.status(500).json({
            success : false,
            data : null,
            message : `Error ${error.message}`
        })
    }
})

// Generate from image

chatRouter.post("/generate-image",
    upload.single('image'),
    check('prompt').notEmpty().withMessage('Prompt must be filled'),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        if (!req.file) {
            return res.status(400).json({ errors: [{ message: "Photo must be filled" }] });
        }
        
        
        try {

            const {body} = req
            const { prompt} = body
            const imageBase64 = req.file.buffer.toString('base64')

            const aiResponse = await ai.models.generateContent({
                model : process.env.GEMINI_MODEL,
                contents : [
                    {
                        text : prompt,
                    },
                    {
                        inlineData : {
                            mimeType : req.file.mimetype, data : imageBase64
                        }
                    }
                ]
            })

            res.status(200).json({
                success : true,
                data : extractText(aiResponse)
            })
            
        } catch (error) {
            res.status(500).json({
                success : false,
                data : null,
                message : `Error ${error.message}`
            })
        }


})


// Generate from document

chatRouter.post("/generate-document", 
    upload.single('document'),
    check('prompt').notEmpty().withMessage('Prompt must be filled'),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        if (!req.file) {
            return res.status(400).json({ errors: [{ message: "Document must be filled" }] });
        }

        try {

            const {body} = req
            const {prompt} = body
            const docBase64 = req.file.buffer.toString('base64')

            const aiResponse = await ai.models.generateContent({
                model : process.env.GEMINI_MODEL,
                contents : [
                    {
                        text : prompt
                    },
                    {
                        inlineData : {
                            mimeType: req.file.mimetype,
                            data : docBase64
                        }
                    }
                ]
            })

            res.status(200).json({
                success : true,
                data : extractText(aiResponse)
            })
            
        } catch (error) {
            res.status(500).json({
                success : false,
                data : null,
                message : `Error ${error.message}`
            })
        }


    }
)

// Generate from audio
chatRouter.post("/generate-audio",
    upload.single('audio'),
    check('prompt').notEmpty().withMessage('Prompt must be filled'),
    async(req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        if (!req.file) {
            return res.status(400).json({ errors: [{ message: "Audio must be filled" }] });
        }

        try {

            const {body} = req
            const {prompt} = body
            const audioBase64 = req.file.buffer.toString('base64')

            const aiResponse = await ai.models.generateContent({
                model : process.env.GEMINI_MODEL,
                contents : [
                    {
                        text : prompt
                    },
                    {
                        inlineData : {
                            mimeType : req.file.mimetype,
                            data : audioBase64
                        }
                    }
                ]
            })

            res.status(200).json({
                success : true,
                data : extractText(aiResponse)
            })
            
        } catch (error) {
            res.status(500).json({
                success : false,
                data : null,
                message : `Error ${error.message}`
            })
        }
    }
)

export default chatRouter