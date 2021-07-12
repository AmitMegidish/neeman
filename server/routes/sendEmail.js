const router = require('express').Router()

"use strict";
const nodemailer = require("nodemailer");

router.post('/', async (req, res) => {
    try {
        const { employee, branch, dueDate, cartItems, orderId } = req.body

        // const emailBody = JSON.parse(cartItems)

        if (!employee || !branch || !dueDate || !cartItems, !orderId)
            return res.status(400).json({ err: true, msg: 'חסרים פרטים לשליחת המייל' });

        let transporter = nodemailer.createTransport({
            host: "cpanel22.livedns.co.il",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "_mainaccount@cafe-neeman.co.il",
                pass: "pb.X_)id!Rk4"
            },
        });

        const d = dueDate.slice(0, 10)

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"הזמנה התקבלה: ${branch}" <mainaccount@cafe-neeman.co.il>`,
            to: 'order@cafe-neeman.co.il',
            subject: `הזמנה מסניף המושבה לתאריך: ${d.toString().split('-').reverse().join('.')} `, // Subject line
            html:
                `<div style="width:800px;border:1px black solid;">
        <div style="width:100%;background-color: #000000;height: 60px;margin-bottom: 5px;">
            <img src="https://i.ibb.co/hXNJbNF/NewLogo.png" height="100%" width="20%" style="margin-right: 37%;" />
        </div>

        <div style=" width:100%;color:black;font-size: 16px; text-align: center;margin:0 auto 5px;">
            <u> שם השולח</u>: ${employee},
            <u> סניף</u>: ${branch},
            <u> תאריך אספקה</u>: ${d.toString().split('-').reverse().join('/')},
            <u> מספר הזמנה</u>: ${orderId}
        </div>

                <table style="margin:0 auto 10px;width:50%;border-collapse: collapse;color:black;">
           <tr style="border:1px solid black;">
            <th style="border:1px solid black;">מוצר</th>
             <th style="border:1px solid black;">קוד</th> 
             <th style="border:1px solid black;">כמות</th>
           </tr>
          ${cartItems.map(element =>
                    `<tr style="border:1px solid black;">
            <th style="border:1px solid black;">${element.product.name}</th>
            <th style="border:1px solid black;">${element.product.id}</th>
            <th style="border:1px solid black;">${element.qty}</th>
          </tr>`
                ).join("")}
        </table>
    </div>`
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.status(200).json({ err: false, message: "הזמנה נשלחה בהצלחה ל איימיל" });
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

module.exports = router;
