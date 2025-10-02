import { Router } from "express"
import { GoogleGenAI } from "@google/genai";
const chatRouter = Router()
import { body, validationResult, check } from "express-validator";


const ai = new GoogleGenAI({})


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
            console.error(error);
            res.status(500).json({
                success: false,
                data: null,
                message: error.message
            })
            
        }
})

export default chatRouter