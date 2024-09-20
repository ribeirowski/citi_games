import { Request, Response } from "express";
import { MailHandler, MailTemplate } from "src/services";

class MailController {
    sendEmail =  async function sendEmail(req:Request, res:Response) {
        try {
            const { userName, userEmail, subjectText, nameMatch, date, time, platform, linkMatch } = req.body
    
            const emailConfig = {
                userName,
                userEmail,
                subjectText,
                html: MailTemplate(userName, nameMatch, date, time, platform, linkMatch)
            }
    
            const emailResponse = await MailHandler(emailConfig)
    
            if(emailResponse) {
                res.status(200).json({message: 'Email enviado com sucesso'})
            } else {
                res.status(400).json({message: 'Erro ao enviar email'})
            }
        } catch (error) {
            res.status(400).json({message: 'Erro ao enviar email'})
        }
}
}

export default new MailController()