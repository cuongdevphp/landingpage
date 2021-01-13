exports.config = {
    host: '10.11.0.77',
    port: 25,
    secure: false,
    auth: {
        user: 'csvcsc',
        pass: '67domino@'
    },
    tls: {
        rejectUnauthorized: false
    }
}

exports.template_validation = ({ link, name, host }) => `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
    <title>Xác nhận tài khoản</title>
    <!--[if mso]>
                <style>
                    * {
                        font-family: sans-serif !important;
                    }
                </style>
            <![endif]-->
    <!--[if !mso]><!-->
    <!-- <![endif]-->
    <style>
    html {
        margin: 0 !important;
        padding: 0 !important;
    }
        
    * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
    }
        
    
    td {
        vertical-align: top;
        mso-table-lspace: 0pt !important;		
        mso-table-rspace: 0pt !important;
    }
    
        
    a {
        text-decoration: none;
    }
        
    
    img {
        -ms-interpolation-mode:bicubic;
    }
        
        
        
    
    @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
        u ~ div .email-container {
            min-width: 320px !important;
        }
    }
    
    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
        u ~ div .email-container {
            min-width: 375px !important;
        }
    }
    
    @media only screen and (min-device-width: 414px) {
        u ~ div .email-container {
            min-width: 414px !important;
        }
    }
        
    </style>
    <!--[if gte mso 9]>
            <xml>
                <o:OfficeDocumentSettings>
                    <o:AllowPNG/>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
    <style>
    @media only screen and (max-device-width: 679px), only screen and (max-width: 679px) {
    
        .eh {
            height:auto !important;
        }
    
        .desktop {
            display: none !important;
            height: 0 !important;
            margin: 0 !important;
            max-height: 0 !important;
            overflow: hidden !important;
            padding: 0 !important;
            visibility: hidden !important;
            width: 0 !important;
        }
        
        .mobile {
            display: block !important;
            width: auto !important;
            height: auto !important;
            float: none !important;
        }
            
            
            .email-container {
                width: 100% !important;
                margin: auto !important;
            }
        
            
            .stack-column,
            .stack-column-center {
                display: block !important;
                width: 100% !important;
                max-width: 100% !important;
                direction: ltr !important;
            }
            
            .stack-column-center {
                text-align: center !important;
            }
        
            
            .center-on-narrow {
                text-align: center !important;
                display: block !important;
                margin-left: auto !important;
                margin-right: auto !important;
                float: none !important;
            }
            table.center-on-narrow {
                display: inline-block !important;
            }
    
        }
        
    </style>
    </head>

    <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly;">
    <div style="background-color:#e5e5e5;">
    <!--[if gte mso 9]>
                                    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                                    <v:fill type="tile" color="#e5e5e5"/>
                                    </v:background>
                                    <![endif]-->
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
        <td style="background-color:#e5e5e5;border-collapse:separate !important;" valign="top" align="center">
        <table bgcolor="#ffffff" style="margin: 0 auto;" align="center" id="brick_container" cellspacing="0" cellpadding="0" border="0" width="680" class="email-container">
        <tr>
        <td>
            <div style="height:32px;line-height:32px;font-size: 32px; ">&nbsp;</div>
            <table width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
            <td>
            <table align="center" cellspacing="0" cellpadding="0" border="0">
                <tr>
                <td>
                <img src="${host}/emails/uDyOOFzYPHkvbUPhYgYO3b6oukB7GT.png" width="560" alt="1" border="0" style="; height:auto;margin:auto;display:block;">
                </td>
                </tr>
            </table>
            </td>
            </tr>
            </table>
        </td>
        </tr>
        <tr>
        <td>
            <div style="height:25px;line-height:25px;font-size: 25px; ">&nbsp;</div>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
            <td class="eh" style="padding-left:60px; text-align:left; height:144px">
            <div style="line-height:22px"><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">Kính gửi Quý nhà đầu tư </span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">${name}</span></div>
            <div style="height:16px;line-height:16px;font-size:16px;">&nbsp;</div>
            <div style="line-height:22px"><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">Công ty Cổ phần chứng khoán Bản Việt</span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;"> (Viet Capital Securities Corporation – VCSC) xin trân trọng cảm ơn Quý nhà đầu tư đã tin tưởng và sử dụng dịch vụ của Chúng tôi.</span></div>
            <div style="height:16px;line-height:16px;font-size:16px;">&nbsp;</div>
            <div style="line-height:22px"><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">Để hoàn tất đăng ký mở tài khoản, Quý nhà đầu tư vui lòng click vào link bên dưới để hoàn tất xác thực tài khoản.</span></div>
            
            </td>
            </tr>
            </table>
        </td>
        </tr>
        <tr>
        <td>
            <div style="height:12px;line-height:12px;font-size: 12px; ">&nbsp;</div>
        </td>
        </tr>
        <tr>
            <td style="padding-left:60px;padding-right:60px; text-align:left">
                <a href="${link}" style="display: inline-block; font-family:Arial, Helvetica, sans-serif;height:47px;line-height:47px;font-size: 14px;width: 200px; background-color: #00377b;border-radius: 4px; color: white; text-align: center; cursor: pointer;"> Xác nhận tài khoản </a>
            </td>
        </tr>
        <tr>
        <td>
            <div style="height:12px;line-height:12px;font-size: 12px; ">&nbsp;</div>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
            <td style="padding-left:60px; text-align:left;">
            <div style="line-height:21px"><span style="color: #000000;line-height:21px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">Quý nhà đầu tư cần giúp đỡ? Hãy liên lạc với chúng tôi </span></div>
            <div style="line-height:21px"><span style="color: #00377b;line-height:21px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">Hồ Chí Minh: (+84 8) 3821 6636 - Hà Nội: (+84) 24 6262 6999</span><span style="color: #00377b;line-height:21px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;"> (Ext: 310)</span><span style="color: #000000;line-height:21px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;"> </span></div>
            <div style="line-height:21px"><span style="color: #000000;line-height:21px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">hoặc qua email </span><span style="color: #00377b;line-height:21px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">customer.service@vcsc.com.vn</span></div>
            </td>
            </tr>
            </table>
        </td>
        </tr>
        <tr>
        <td>
            <div style="height:12px;line-height:12px;font-size: 12px; ">&nbsp;</div>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
            <td style="padding-left:60px; text-align:left;">
            <div style="line-height:normal"><span style="color: #000000;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">Trân trọng!</span></div>
            </td>
            </tr>
            </table>
        </td>
        </tr>
        <tr>
        <td style="padding-left:60px;padding-right:60px;">
            <div style="height:39px;line-height:39px;font-size: 39px; ">&nbsp;</div>
            <table align="center" cellspacing="0" cellpadding="0" border="0" style="margin:auto;">
            <tr>
            <td width="560">
            <table cellpadding="0" cellspacing="0" bgcolor="#ededf2" height="0.99847412109375" width="100%" style="line-height:0.99847412109375px; height:0.99847412109375px!important;background-color:#ededf2; border-collapse:separate !important;margin:0 auto;text-align:center;">
                <tr>
                <td>&nbsp;</td>
                </tr>
            </table>
            </td>
            </tr>
            </table>
        </td>
        </tr>
        <tr>
        <td>
            <div style="height:17px;line-height:17px;font-size: 17px; ">&nbsp;</div>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
            <td style="padding-left:60px; text-align:left;">
            <div style="line-height:14px"><span style="color: #00377b;line-height:14px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:10px;text-align:left;font-weight: 700;">Công ty Cổ phần Chứng khoán Bản Việt (VCSC – HoSE: VCI)</span></div>
            </td>
            </tr>
            </table>
        </td>
        </tr>
        <tr>
        <td>
            <div style="height:4px;line-height:4px;font-size: 4px; ">&nbsp;</div>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
            <td style="padding-left:60px; text-align:left;">
            <div style="line-height:14px"><span style="color: #5f5f5f;line-height:14px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:10px;text-align:left;">Tòa nhà Vinatex, lầu 3, 10 Nguyễn Huệ, Quận 1, Tp.HCM, Việt Nam</span></div>
            </td>
            </tr>
            </table>
        </td>
        </tr>
        <tr>
        <td>
            <div style="height:4px;line-height:4px;font-size: 4px; ">&nbsp;</div>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
            <td style="padding-left:60px; text-align:left;">
            <div style="line-height:14px"><span style="color: #5f5f5f;line-height:14px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:10px;text-align:left;">T: (84 8) 3821 6636 |  F: (84 8) 3914 3577</span></div>
            </td>
            </tr>
            </table>
        </td>
        </tr>
        <tr>
        <td>
            <div style="height:4px;line-height:4px;font-size: 4px; ">&nbsp;</div>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
            <td style="padding-left:60px; text-align:left;">
            <div style="line-height:14px"><span style="color: #00377b;line-height:14px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:10px;text-align:left;">www.vcsc.com.vn</span></div>
            </td>
            </tr>
            </table>
            <div style="height:32px;line-height:32px;font-size:32px;">&nbsp;</div>
        </td>
        </tr>
        </table>
        </td>
    </tr>
    </table>
    </div>
    </body>

    </html>
`;

exports.template_validated = ({ name, host }) => `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
    <title>email_success</title>
    <link href="https://fonts.googleapis.com/css?family=Judson:400&display=swap&subset=cyrillic" rel="stylesheet">
    <!--[if mso]>
                <style>
                    * {
                        font-family: sans-serif !important;
                    }
                </style>
            <![endif]-->
    <!--[if !mso]><!-->
    <!-- <![endif]-->
    <style>
    html {
        margin: 0 !important;
        padding: 0 !important;
    }
        
    * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
    }
        
    
    td {
        vertical-align: top;
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
    }
    
        
    a {
        text-decoration: none;
    }
        
    
    img {
        -ms-interpolation-mode:bicubic;
    }
        
        
        
    
    @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
        u ~ div .email-container {
            min-width: 320px !important;
        }
    }
    
    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
        u ~ div .email-container {
            min-width: 375px !important;
        }
    }
    
    @media only screen and (min-device-width: 414px) {
        u ~ div .email-container {
            min-width: 414px !important;
        }
    }
        
    </style>
    <!--[if gte mso 9]>
            <xml>
                <o:OfficeDocumentSettings>
                    <o:AllowPNG/>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
    <style>
    @media screen and (max-width: 599px) {
        
        .email-container {
            width: 100% !important;
            margin: auto !important;
        }
        
        
        .stack-column,
        .stack-column-center {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            direction: ltr !important;
        }
        
        .stack-column-center {
            text-align: center !important;
        }
        
        
        .center-on-narrow {
            text-align: center !important;
            display: block !important;
            margin-left: auto !important;
            margin-right: auto !important;
            float: none !important;
        }
        table.center-on-narrow {
            display: inline-block !important;
        }
    
    }
        
    </style>
    </head>

    <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly;">
    <div style="background-color:#ffffff;">
    <!--[if gte mso 9]>
                                    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                                    <v:fill type="tile" color="#ffffff"/>
                                    </v:background>
                                    <![endif]-->
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
        <td style="background-color:#ffffff;border-collapse:separate !important;" valign="top" align="center">
        <table bgcolor="#ffffff" style="border:0px solid transparent;border-radius:0px;margin: 0 auto;" align="center" id="brick_container" cellspacing="0" cellpadding="0" border="0" width="680" class="email-container">
            <tr>
                <td>
                <div style="height:44px;line-height:44px;font-size: 44px;"> </div>
                <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                    <td>
                    <table align="left" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                        <td style="padding-left:60px;padding-right:60px;">
                        <img class="HMr0J3gjOhkHGb9CIgjo" src="https://invest.vcsc.com.vn/mo-tai-khoan-online/emails/logo.png" width="165" height="40" alt="Group 2" border="0" style="width: 165px;height:auto;margin:auto;display:block;">
                        </td>
                    </tr>
                    </table>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>
            <tr>  
        <tr>
        <td>
            <div style="height:44px;line-height:44px;font-size: 44px;"> </div>
        </td>
        </tr>
        <tr>
        <td style="padding-left:60px;padding-right:60px; ">
            <table align="center" cellspacing="0" cellpadding="0" border="0">
            <tr>
            <td style="background-color:transparent;border-collapse:separate !important;">
                <img class="88xpMeHlPVZimNv45QHE" src="https://invest.vcsc.com.vn/mo-tai-khoan-online/emails/banner.png" width="100%" height="" alt="img" border="0" style="; height:auto;margin:auto;display:block;">
            </td>
            </tr>
            </table>
        </td>
        </tr>
        <tr>
        <td>
            <div style="height:25px;line-height:25px;font-size: 25px;"> </div>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
            <td style="padding-left:60px;padding-right:60px; text-align:left">
            <div style="line-height:22px"><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">Bây giờ quý nhà đầu tư </span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">${name}</span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;"> đã có thể trải nghiệm phần mềm giao dịch qua:</span></div>
            </td>
            </tr>
            </table>
        </td>
        </tr>
        <tr>
        <td>
            <div style="height:20px;line-height:20px;font-size: 20px;"> </div>
            <table width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
            <td>
            <table align="center" cellspacing="0" cellpadding="0" border="0">
                <tr>
                <td style="padding-left:0px;padding-right:0px;">
                    <a href="https://bond.vcsc.com.vn/login" target="_blank"><img class="Xt6U9LlrymAsziMaDKYW" src="https://invest.vcsc.com.vn/mo-tai-khoan-online/emails/Xt6U9LlrymAsziMaDKYW.png" width="120" height="" alt="4" border="0" style="; height:auto;margin:auto;display:block;"></a>
                </td>
                <td style="padding-left:0px;padding-right:0px;">
                    <a href="https://trading.vcsc.com.vn/" target="_blank"><img class="cTkqz6LSarBXTUDJA7G7" src="https://invest.vcsc.com.vn/mo-tai-khoan-online/emails/cTkqz6LSarBXTUDJA7G7.png" width="120" height="" alt="2" border="0" style="; height:auto;margin:auto;display:block;"></a>
                </td>
                <td style="padding-left:0px;padding-right:0px;">
                    <a href="https://play.google.com/store/apps/details?id=com.tradex.vcsc&hl=en" target="_blank"><img class="CmihrNRLHjVaQPOMNUXl" src="https://invest.vcsc.com.vn/mo-tai-khoan-online/emails/CmihrNRLHjVaQPOMNUXl.png" width="120" height="" alt="3" border="0" style="; height:auto;margin:auto;display:block;"></a>
                </td>
                <td style="padding-left:0px;padding-right:0px;">
                    <a href="https://www.vcsc.com.vn//userfiles/upload/file/VCSC/V_Pro_full.zip" target="_blank"><img class="ROucH25x0ox9EXmnNgZR" src="https://invest.vcsc.com.vn/mo-tai-khoan-online/emails/ROucH25x0ox9EXmnNgZR.png" width="120" height="" alt="1" border="0" style="; height:auto;margin:auto;display:block;"></a>
                </td>
                </tr>
            </table>
            </td>
            </tr>
            </table>
        </td>
        </tr>
        <tr>
        <td>
         <div style="height:32px;line-height:32px;font-size: 32px;"> </div>
         <table cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
           <td style="padding-left:60px;padding-right:0px; text-align:left">
            <div style="line-height:22px"><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">Tài khoản demo để trải nghiệm ngay bây giờ: </span></div>
           </td>
          </tr>
         </table>
        </td>
       </tr>
       <tr>
        <td>
         <div style="height:4px;line-height:4px;font-size: 4px;"> </div>
         <table cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
           <td style="padding-left:60px;padding-right:0px; text-align:left">
            <div style="line-height:22px"><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">• Bước 1</span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">: Điền thông tin đăng nhập gồm:</span></div>
           </td>
          </tr>
         </table>
        </td>
       </tr>
       <tr>
        <td>
         <table cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
           <td style="padding-left:84px;padding-right:0px; text-align:left">
            <div style="line-height:22px"><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">User: </span><span style="color: #c42127;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">customer</span></div>
            <div style="line-height:22px"><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">Password: </span><span style="color: #c42127;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">123abc</span></div>
           </td>
          </tr>
         </table>
        </td>
       </tr>
       <tr>
        <td>
         <div style="height:8px;line-height:8px;font-size: 8px;"> </div>
         <table cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
           <td style="padding-left:60px;padding-right:0px; text-align:left">
            <div style="line-height:22px"><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">• Bước 2</span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">: Chọn ‘</span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">Đăng Nhập</span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">’</span></div>
           </td>
          </tr>
         </table>
        </td>
       </tr>
       <tr>
        <td>
         <div style="height:4px;line-height:4px;font-size: 4px;"> </div>
         <table cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
           <td style="padding-left:60px;padding-right:0px; text-align:left">
            <div style="line-height:22px"><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">• Bước 3</span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">: Chọn ‘</span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">Chế độ chỉ xem</span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">’ (đối với V-Web, V-Mobile, V-Bond) hoặc chọn ‘</span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">Bỏ qua</span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">’ (đối với V-Pro)</span></div>
           </td>
          </tr>
         </table>
        </td>
       </tr>
       <tr>
        <td>
         <div style="height:24px;line-height:24px;font-size: 24px;"> </div>
         <table cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
           <td style="padding-left:60px;padding-right:0px; text-align:left">
            <div style="line-height:22px"><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">Nhân viên môi giới của chúng tôi sẽ sớm liên lạc với quý nhà đầu tư để hoàn tất các thủ tục còn lại!</span></div>
            <div style="height:16px;line-height:16px;font-size:16px;"> </div>
            <div style="line-height:22px"><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">Ngoài ra, quý nhà đầu tư có thể xem qua kho dữ liệu phân tích của chúng tôi tại đây:</span></div>
           </td>
          </tr>
         </table>
        </td>
       </tr>
       <tr>
        <td>
         <div style="height:32px;line-height:32px;font-size: 32px;"> </div>
         <table cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
           <td style="padding-left:60px;padding-right:0px; text-align:left">
            <div style="line-height:21px"><span style="color: #000000;line-height:21px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">Cần giúp đỡ? Hãy liên lạc với chúng tôi </span></div>
            <div style="line-height:21px"><br><span style="color: #00377b;line-height:21px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">Hồ Chí Minh: (+84) 28 3914 3588 — Hà Nội: (+84) 24 6262 6999</span></div>
           </td>
          </tr>
         </table>
        </td>
       </tr>
       <tr>
        <td>
         <div style="height:16px;line-height:16px;font-size: 16px;"> </div>
         <table cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
           <td style="padding-left:62px;padding-right:0px; text-align:left">
            <div style="line-height:normal"><span style="color: #000000;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">Xin trân trọng cám ơn!</span></div>
           </td>
          </tr>
         </table>
        </td>
       </tr>
       <tr>
        <td style="padding-left:60px;padding-right:60px;">
         <div style="height:40px;line-height:40px;font-size: 40px;"> </div>
         <table align="center" cellspacing="0" cellpadding="0" border="0" style="margin:auto;">
          <tr>
           <td width="560">
            <table cellpadding="0" cellspacing="0" bgcolor="#ededf2" height="0.99847412109375" width="100%" style="line-height:0.99847412109375px; height:0.99847412109375px!important;background-color:#ededf2;border:0px solid transparent;border-collapse:separate !important;border-radius:0px;margin:0 auto;text-align:center;">
             <tr>
              <td> </td>
             </tr>
            </table>
           </td>
          </tr>
         </table>
        </td>
       </tr>
       <tr>
        <td>
         <div style="height:16px;line-height:16px;font-size: 16px;"> </div>
         <table cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
           <td style="padding-left:60px;padding-right:0px; text-align:left">
            <div style="line-height:14px"><span style="color: #00377b;line-height:14px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:10px;text-align:left;font-weight: 700;">CTCP Chứng Khoán Bản Việt (HoSE: VCI)</span></div>
           </td>
          </tr>
         </table>
        </td>
       </tr>
       <tr>
        <td>
         <div style="height:4px;line-height:4px;font-size: 4px;"> </div>
         <table cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
           <td style="padding-left:60px;padding-right:0px; text-align:left">
            <div style="line-height:14px"><span style="color: #5f5f5f;line-height:14px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:10px;text-align:left;">Tháp tài chính Bitexco, Lầu 15, 2 Hải Triều, Quận 1, TP. HCM</span></div>
           </td>
          </tr>
         </table>
        </td>
       </tr>
       <tr>
        <td>
         <div style="height:4px;line-height:4px;font-size: 4px;"> </div>
         <table cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
           <td style="padding-left:60px;padding-right:0px; text-align:left">
            <div style="line-height:14px"><span style="color: #5f5f5f;line-height:14px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:10px;text-align:left;">Điện thoại: (+84) 28 3914 3588 | Fax: (+84) 28 3914 3209</span></div>
           </td>
          </tr>
         </table>
        </td>
       </tr>
       <tr>
        <td>
         <div style="height:4px;line-height:4px;font-size: 4px;"> </div>
         <table cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
           <td style="padding-left:60px;padding-right:0px; text-align:left">
            <div style="line-height:14px"><span style="color: #00377b;line-height:14px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:10px;text-align:left;">www.vcsc.com.vn</span></div>
           </td>
          </tr>
         </table>
         <div style="height:32px;line-height:32px;font-size:32px;"> </div>
        </td>
       </tr>
      </table>
     </td>
    </tr>
   </table>
  </div>
 </body>

    </html>
`

exports.template_send_test = () => `
    
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
 <head> 
  <meta charset="UTF-8"> 
  <meta name="viewport" content="width=device-width, initial-scale=1"> 
  <meta name="x-apple-disable-message-reformatting"> 
  <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
  <meta name="format-detection" content="telephone=no"> 
  <title>T8_KH VCSC_annt7</title> 
  <!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--> 
  <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
  <!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]--> 
  <style type="text/css">
@media only screen and (max-width:600px) {p, ul li, ol li, a { font-size:16px!important; line-height:150%!important } h1 { font-size:30px!important; text-align:center; line-height:120%!important } h2 { font-size:13px!important; text-align:center; line-height:120%!important } h3 { font-size:11px!important; text-align:center; line-height:120%!important } h1 a { font-size:30px!important } h2 a { font-size:13px!important } h3 a { font-size:11px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button { font-size:16px!important; display:inline-block!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } .es-desk-menu-hidden { display:table-cell!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
#outlook a {
	padding:0;
}
.ExternalClass {
	width:100%;
}
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
	line-height:100%;
}
.es-button {
	mso-style-priority:100!important;
	text-decoration:none!important;
}
a[x-apple-data-detectors] {
	color:inherit!important;
	text-decoration:none!important;
	font-size:inherit!important;
	font-family:inherit!important;
	font-weight:inherit!important;
	line-height:inherit!important;
}
.es-desk-hidden {
	display:none;
	float:left;
	overflow:hidden;
	width:0;
	max-height:0;
	line-height:0;
	mso-hide:all;
}
</style> 
 </head> 
 <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
  <div class="es-wrapper-color" style="background-color:#FFF2CC"> 
   <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#fff2cc" origin="0.5, 0" position="0.5,0"></v:fill>
			</v:background>
		<![endif]--> 
   <table width="100%" class="es-wrapper" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
     <tr style="border-collapse:collapse"> 
      <td valign="top" style="padding:0;Margin:0"> 
       <table align="center" class="es-content" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
         <tr style="border-collapse:collapse"> 
          <td align="center" style="padding:0;Margin:0"> 
           <table align="center" class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ECECEC;width:600px" bgcolor="#ececec" cellspacing="0" cellpadding="0"> 
             <tr style="border-collapse:collapse"> 
              <td align="left" style="padding:0;Margin:0"> 
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr style="border-collapse:collapse"> 
                  <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
                   <table width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF" bgcolor="#ffffff" cellspacing="0" cellpadding="0" role="presentation"> 
                     <tr style="border-collapse:collapse"> 
                      <td style="padding:0;Margin:0"> 
                       <table cellpadding="0" cellspacing="0" width="100%" class="es-menu" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr class="links-images-top" style="border-collapse:collapse"> 
                          <td align="center" valign="top" width="50%" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:10px;padding-bottom:10px;border:0"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:none;display:block;color:#E2424A"><img src="https://xfezm.stripocdn.email/content/guids/CABINET_1de9a06d2ac143e0d21be84c7ef95dda/images/82521591949654369.jpg" alt title height="47" align="absmiddle" style="display:inline-block !important;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;padding-bottom:5px"><br></a></td> 
                          <td align="center" valign="top" width="50%" bgcolor="transparent" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:10px;padding-bottom:10px;border:0"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:none;display:block;color:#E2424A"><img src="https://xfezm.stripocdn.email/content/guids/CABINET_1de9a06d2ac143e0d21be84c7ef95dda/images/59211590122254994.png" alt title height="47" align="absmiddle" style="display:inline-block !important;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;padding-bottom:5px"><br></a></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
       <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
         <tr style="border-collapse:collapse"> 
          <td align="center" style="padding:0;Margin:0"> 
           <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
             <tr style="border-collapse:collapse"> 
              <td style="padding:0;Margin:0;background-position:left top" align="left"> 
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr style="border-collapse:collapse"> 
                  <td valign="top" align="center" style="padding:0;Margin:0;width:600px"> 
                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://xfezm.stripocdn.email/content/guids/CABINET_1de9a06d2ac143e0d21be84c7ef95dda/images/1861591949639703.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600"></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
       <table align="center" class="es-content" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
         <tr style="border-collapse:collapse"> 
          <td align="center" style="padding:0;Margin:0"> 
           <table align="center" class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ECECEC;width:600px" bgcolor="#ececec" cellspacing="0" cellpadding="0"> 
             <tr style="border-collapse:collapse"> 
              <td align="left" bgcolor="#090909" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;background-color:#090909"> 
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr style="border-collapse:collapse"> 
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                   <table width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:0px" cellspacing="0" cellpadding="0" role="presentation"> 
                     <tr style="border-collapse:collapse"> 
                      <td style="Margin:0;padding-left:10px;padding-right:10px;padding-top:20px;padding-bottom:20px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#FFFFFF;text-align:justify"><strong>Quý khách thân mến, </strong><br><br>Quý khách vừa nhận được lời mời Trải nghiệm&nbsp;dịch vụ Ngân hàng Ưu tiên cùng những đặc quyền hấp dẫn từ <span style="color:#996633"><strong>VPBank Diamond</strong></span> – một trong những đối tác chiến lược hàng đầu của chúng tôi.</p></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
             <tr style="border-collapse:collapse"> 
              <td align="left" style="padding:0;Margin:0"> 
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr style="border-collapse:collapse"> 
                  <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://xfezm.stripocdn.email/content/guids/CABINET_1de9a06d2ac143e0d21be84c7ef95dda/images/73301597122102786.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600"></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
             <tr style="border-collapse:collapse"> 
              <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px;background-color:#090909" bgcolor="#090909"> 
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr style="border-collapse:collapse"> 
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                   <table width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:0px" cellspacing="0" cellpadding="0" role="presentation"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" style="padding:0;Margin:0;padding-bottom:5px;padding-left:10px;padding-right:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:28px;color:#FFFFFF"><em>Cùng nhiều ưu đãi hấp dẫn khác dành tặng Quý khách và người thân!</em><br><strong>Ưu đãi có hiệu lực đối với cho các đăng ký từ nay đến 31/12/2020</strong></p></td> 
                     </tr> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" style="padding:10px;Margin:0"> 
                       <!--[if mso]><a href="https://diamond.vpbank.com.vn/sites/default/files/landingpage/Dac-quyen-VPBank-Diamond-VCSC.html" target="_blank">
	<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" stripoVmlButton href="https://diamond.vpbank.com.vn/sites/default/files/landingpage/Dac-quyen-VPBank-Diamond-VCSC.html" 
                style="height:41px;v-text-anchor:middle;width:202px;" arcsize="54%" stroke="f" fillcolor="#f3cf57">
		<w:anchorlock></w:anchorlock>
		<center style='color:#000000;font-family:arial, "helvetica neue", helvetica, sans-serif;font-size:14px;font-weight:700;'>NHẬN LỜI MỜI ƯU TIÊN</center>
	</v:roundrect></a>
<![endif]--> 
                       <!--[if !mso]><!-- --><span class="msohide es-button-border" style="border-style:solid;border-color:#3D3D3D;background:#F3CF57;border-width:0px;display:inline-block;border-radius:22px;width:auto;mso-hide:all"><a class="es-button" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;color:#000000;border-style:solid;border-color:#F3CF57;border-width:7px 20px;display:inline-block;background:#F3CF57;border-radius:22px;font-weight:bold;font-style:normal;line-height:17px;width:auto;text-align:center" href="https://diamond.vpbank.com.vn/sites/default/files/landingpage/Dac-quyen-VPBank-Diamond-VCSC.html" target="_blank">NHẬN LỜI MỜI ƯU TIÊN</a></span> 
                       <!--<![endif]--></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
       <table align="center" class="es-content" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
         <tr style="border-collapse:collapse"> 
          <td align="center" style="padding:0;Margin:0"> 
           <table align="center" class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ECECEC;width:600px" bgcolor="#ececec" cellspacing="0" cellpadding="0"> 
             <tr style="border-collapse:collapse"> 
              <td align="left" bgcolor="#090909" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;background-color:#090909"> 
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr style="border-collapse:collapse"> 
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:10px;padding-bottom:25px"><h2 style="Margin:0;line-height:17px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;font-style:normal;font-weight:normal;color:#333333"><em><span style="color:#996633"><strong>VPBank Diamond</strong></span><span style="color:#FFFFFF"> là Dịch vụ Ngân hàng Ưu tiên của VPBank được thiết kế dành riêng cho các Khách hàng cá nhân có tổng tài sản tại VPBank từ </span><span style="color:#996633"><strong>1 tỷ đồng</strong></span><span style="color:#FFFFFF"> hoặc số dư tài khoản thanh toán tại VPBank trung bình tháng từ </span><span style="color:#996633"><strong>150 triệu đồng</strong></span><span style="color:#FFFFFF">.<br><br>Khi trở thành khách hàng ưu tiên của VPBank Diamond, Quý khách sẽ sở hữu các quyền lợi ưu tiên tài chính và phi tài chính cao cấp nhất của VPBank. Nhấn vào đường link để biết thêm thông tin chi tiết về&nbsp;<a href="https://diamond.vpbank.com.vn/gioi-thieu/#gioi-thieu-dich-vu" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#173A59">dịch vụ VPBank Diamond</a>.</span></em></h2></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
       <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
         <tr style="border-collapse:collapse"> 
          <td align="center" style="padding:0;Margin:0"> 
           <table align="center" class="es-footer-body" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"> 
             <tr style="border-collapse:collapse"> 
              <td align="left" style="padding:0;Margin:0;background-color:#EFEFEF" bgcolor="#efefef"> 
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                 <tr style="border-collapse:collapse"> 
                  <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" bgcolor="#090909" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px"><h3 style="Margin:0;line-height:14px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:12px;font-style:normal;font-weight:normal;color:#996633">Ngân hàng Việt Nam Thịnh Vượng VPBank © 2017.</h3><h3 style="Margin:0;line-height:14px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:12px;font-style:normal;font-weight:normal;color:#996633">Trụ sở chính: 89 Láng Hạ, Q. Đống Đa, Hà Nội | Điện thoại: 024 39288869 | Fax: 024 39288867</h3><h3 style="Margin:0;line-height:14px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:12px;font-style:normal;font-weight:normal;color:#996633">Email: diamond247@vpbank.com.vn | Website: www.diamond.vpbank.com.vn</h3></td> 
                     </tr> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" bgcolor="#102940" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><h3 style="Margin:0;line-height:14px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:12px;font-style:normal;font-weight:normal;color:#990000">Công ty Cổ phần Chứng khoán Bản Việt (VCSC)</h3><h3 style="Margin:0;line-height:14px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:12px;font-style:normal;font-weight:normal;color:#990000">Tháp tài chính Bitexco, lầu 15, 2 Hải Triều , Quận 1, TP. HCM, Việt Nam</h3><h3 style="Margin:0;line-height:14px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:12px;font-style:normal;font-weight:normal;color:#990000">Hotline (84 28) 3914 3588 - Ext 221, 224</h3></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table></td> 
     </tr> 
   </table> 
  </div> 
  <div class="banner-toolbar"></div>  
 </body>
</html>
`;

exports.template_send_to_user = ({ token, host }) => `
    new user link: ${host}/view.html?token=${token}
`;

exports.template_send_draft_data = ({ token, host, fromDate }) => `
    Truy cập link: <a href="${host}/draft-data?token=${token}&from=${fromDate}">${host}/draft-data.html?token=${token}&from=${fromDate}</a>
`;

exports.template_contracts = ({ name, contracts, mg, host }) => `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
    <title>email_contract</title>
    <!--[if mso]>
                <style>
                    * {
                        font-family: sans-serif !important;
                    }
                </style>
            <![endif]-->
    <!--[if !mso]><!-->
    <!-- <![endif]-->
    <style>
    html {
        margin: 0 !important;
        padding: 0 !important;
    }
        
    * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
    }
        
    
    td {
        vertical-align: top;
        mso-table-lspace: 0pt !important;		
        mso-table-rspace: 0pt !important;
    }
    
        
    a {
        text-decoration: none;
    }
        
    
    img {
        -ms-interpolation-mode:bicubic;
    }
        
        
        
    
    @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
        u ~ div .email-container {
            min-width: 320px !important;
        }
    }
    
    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
        u ~ div .email-container {
            min-width: 375px !important;
        }
    }
    
    @media only screen and (min-device-width: 414px) {
        u ~ div .email-container {
            min-width: 414px !important;
        }
    }
        
    </style>
    <!--[if gte mso 9]>
            <xml>
                <o:OfficeDocumentSettings>
                    <o:AllowPNG/>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
    <style>
    @media only screen and (min-device-width: 600px), only screen and (min-width: 600px) {
        .mobile {
            display: none !important;
            height: 0 !important;
            margin: 0 !important;
            max-height: 0 !important;
            overflow: hidden !important;
            padding: 0 !important;
            visibility: hidden !important;
            width: 0 !important;
        }
    }
        
    @media only screen and (max-device-width: 599px), only screen and (max-width: 599px) {
    
        .eh {
            height:auto !important;
        }
    
        .desktop {
            display: none !important;
            height: 0 !important;
            margin: 0 !important;
            max-height: 0 !important;
            overflow: hidden !important;
            padding: 0 !important;
            visibility: hidden !important;
            width: 0 !important;
        }
        
        .mobile {
            display: block !important;
        }
    
    
        
            .email-container {
                width: 100% !important;
                margin: auto !important;
            }
        
            
            .stack-column,
            .stack-column-center {
                display: block !important;
                width: 100% !important;
                max-width: 100% !important;
                direction: ltr !important;
            }
            
            .stack-column-center {
                text-align: center !important;
            }
        
            
            .center-on-narrow {
                text-align: center !important;
                display: block !important;
                margin-left: auto !important;
                margin-right: auto !important;
                float: none !important;
            }
            table.center-on-narrow {
                display: inline-block !important;
            }
    
        }
        
    </style>
    </head>

    <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly;">
    <div style="background-color:#e5e5e5;">
    <!--[if gte mso 9]>
                                    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                                    <v:fill type="tile" color="#e5e5e5"/>
                                    </v:background>
                                    <![endif]-->
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
        <td style="background-color:#e5e5e5;border-collapse:separate !important;" valign="top" align="center">
        <table bgcolor="#ffffff" style="margin: 0 auto;" align="center" id="brick_container" cellspacing="0" cellpadding="0" border="0" width="680" class="email-container">
        <tr>
        <td>
            <div style="height:24px;line-height:24px;font-size: 24px;">&nbsp;</div>
        
        </td>
        </tr>
        <tr>
        <td>
            <div style="height:24px;line-height:24px;font-size: 24px;">&nbsp;</div>
            <table width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
            <td>
            <table align="center" cellspacing="0" cellpadding="0" border="0">
                <tr>
                <td>
                <img src="${host}/emails/qfeeUpZ7mbiNQi4dk7QpOApZgZgVKz.png" width="560" alt="banner" border="0" style="height:auto;margin:auto;display:block;">
                </td>
                </tr>
            </table>
            </td>
            </tr>
            </table>
        </td>
        </tr>
        <tr>
            <td>
            <div style="height:25px;line-height:25px;font-size: 25px; ">&nbsp;</div>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
            <td class="eh" style="padding-left:60px; text-align:left; height:165px">
                <div style="line-height:22px"><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">Kính gửi Quý nhà đầu tư </span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">${name}</span></div>
                <div style="height:16px;line-height:16px;font-size:16px;">&nbsp;</div>
                <div style="line-height:22px"><br><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">Chúc mừng Quý nhà đầu tư đã định danh điện tử thành công tại VCSC. Thông tin của <br> Quý khách cung cấp sẽ được VCSC kiểm tra và thực hiện Mở tài khoản </span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">trong vòng 24 <br> giờ</span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;"> (không kể ngày lễ và cuối tuần).</span></div>
                <div style="height:16px;line-height:16px;font-size:16px;">&nbsp;</div>
                <div style="line-height:22px"><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">Để không bị gián đoạn dịch vụ: </span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">đặt lệnh</span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">, </span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">rút tiền</span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">, Quý nhà đầu tư cần </span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">hoàn thiện hồ sơ <br> mở tài khoản bản giấy trong vòng 14 ngày</span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">, theo hướng dẫn sau:</span></div>
                <div style="height:16px;line-height:16px;font-size:16px;">&nbsp;</div>
                <div style="line-height:22px"></div>
            </td>
            </tr>
            </table>
            </td>
        </tr>
        <tr>
            <td>
            <div style="height:11px;line-height:11px;font-size: 11px; ">&nbsp;</div>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
            <td style="padding-left:60px; text-align:left;">
                <div style="line-height:22px"><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">Bước 1: Tải và in các hợp đồng mở tài khoản giao dịch Chứng khoán và kí tên:</span></div>
            </td>
            </tr>
            </table>
            </td>
        </tr>
        <tr>
        <td>
            <div style="height:8px;line-height:8px;font-size: 8px;">&nbsp;</div>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
            <td style="padding-left:60px; text-align:left;">
                ${contracts}
            <div style="line-height:22px"><br></div>
            <!-- <div style="line-height:22px"><br><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">• </span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">CMND/Thẻ căn cước: 01 bản photo (còn hạn sử dụng)</span></div> -->
            </td>
            </tr>
            </table>
        </td>
        </tr>
        <tr>
            <td>
            <div style="height:8px;line-height:8px;font-size: 8px; ">&nbsp;</div>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
            <td style="padding-left:60px; text-align:left;">
                <div style="line-height:22px"><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">Bước 2: Gửi hồ sơ qua đường bưu điện hoặc đến trực tiếp văn phòng VCSC</span></div>
            </td>
            </tr>
            </table>
            </td>
        </tr>
        <tr>
            <td>
            <div style="height:6px;line-height:6px;font-size: 6px; ">&nbsp;</div>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
            <td class="eh" style="padding-left:60px; text-align:left; height:94px">
                <div style="line-height:22px"><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">Đừng lo lắng, Chúng tôi sẽ sớm liên lạc với Quý nhà đầu tư để hỗ trợ hoàn tất các thủ tục.</span></div>
                <div style="height:16px;line-height:16px;font-size:16px;">&nbsp;</div>
                <div style="line-height:22px"><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">Tuy nhiên, ngay từ bây giờ Quý nhà đầu tư đã có thể trải nghiệm phần mềm giao dịch<br> qua tài khoản DEMO của VCSC theo hướng dẫn:</span></div>
                <div style="height:16px;line-height:16px;font-size:16px;">&nbsp;</div>
            </td>
            </tr>
            </table>
            </td>
        </tr>
        <tr>
            <td>
            <div style="height:2px;line-height:2px;font-size: 2px; ">&nbsp;</div>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
            <td style="padding-left:60px; text-align:left;">
                <div style="line-height:22px"><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">• Bước 1</span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">: Điền thông tin đăng nhập gồm:</span></div>
            </td>
            </tr>
            </table>
            </td>
        </tr>
        <tr>
            <td>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
            <td style="padding-left:84px; text-align:left;">
                <div style="line-height:22px"><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">User: </span><span style="color: #c42127;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">customer</span></div>
                <div style="line-height:22px"><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">Password: </span><span style="color: #c42127;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">123abc</span></div>
            </td>
            </tr>
            </table>
            </td>
        </tr>
        <tr>
            <td>
            <div style="height:8px;line-height:8px;font-size: 8px; ">&nbsp;</div>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tbody><tr>
            <td style="padding-left:60px; text-align:left;">
                <div style="line-height:22px"><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">• Bước 2</span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">: Chọn ‘</span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">Đăng Nhập</span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">’ - ‘</span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">Chế độ chỉ xem</span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">’ (đối với V-Web, V-Mobile, V-Bond) hoặc<br> chọn ‘</span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">Bỏ qua</span><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">’ (đối với V-Pro)</span></div>
            </td>
            </tr>
            </tbody></table>
            </td>
        </tr>
        <tr>
            <td>
                <div style="height:20px;line-height:20px;font-size: 20px;"> </div>
                <table width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                <td>
                <table align="center" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                    <td style="padding-left:0px;padding-right:0px;">
                        <a href="https://bond.vcsc.com.vn/login" target="_blank"><img class="Xt6U9LlrymAsziMaDKYW" src="https://invest.vcsc.com.vn/mo-tai-khoan-online/emails/Xt6U9LlrymAsziMaDKYW.png" width="120" height="" alt="4" border="0" style="height:auto;margin:auto;display:block;"></a>
                    </td>
                    <td style="padding-left:0px;padding-right:0px;">
                        <a href="https://trading.vcsc.com.vn/" target="_blank"><img class="cTkqz6LSarBXTUDJA7G7" src="https://invest.vcsc.com.vn/mo-tai-khoan-online/emails/cTkqz6LSarBXTUDJA7G7.png" width="120" height="" alt="2" border="0" style="height:auto;margin:auto;display:block;"></a>
                    </td>
                    <td style="padding-left:0px;padding-right:0px;">
                        <a href="http://vmobile.vcsc.com.vn/" target="_blank"><img class="CmihrNRLHjVaQPOMNUXl" src="https://invest.vcsc.com.vn/mo-tai-khoan-online/emails/CmihrNRLHjVaQPOMNUXl.png" width="120" height="" alt="3" border="0" style="height:auto;margin:auto;display:block;"></a>
                    </td>
                    <td style="padding-left:0px;padding-right:0px;">
                        <a href="https://www.vcsc.com.vn//userfiles/upload/file/VCSC/V_Pro_full.zip" target="_blank"><img class="ROucH25x0ox9EXmnNgZR" src="https://invest.vcsc.com.vn/mo-tai-khoan-online/emails/ROucH25x0ox9EXmnNgZR.png" width="120" height="" alt="1" border="0" style="height:auto;margin:auto;display:block;"></a>
                    </td>
                    </tr>
                </table>
                </td>
                </tr>
                </table>
            </td>
            </tr>
            <tr>
                <td>
                <div style="height:24px;line-height:24px;font-size: 24px; ">&nbsp;</div>
                <table cellspacing="0" cellpadding="0" border="0" width="100%">
                <tbody><tr>
                <td style="padding-left:60px; text-align:left;">
                    <div style="line-height:22px"><span style="color: #000000;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">Ngoài ra, Quý nhà đầu tư có thể xem qua kho dữ liệu phân tích của chúng tôi </span>
                    <a href="https://www.vcsc.com.vn/trung-tam-phan-tich"><span style="color: #00377b;line-height:22px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-decoration: underline;text-align:left;font-weight: 700;">tại đây</span></a>
                    </div>
                </td>
                </tr>
                </tbody></table>
                </td>
            </tr>
            <tr>
                <td>
                <div style="height:12px;line-height:12px;font-size: 12px; ">&nbsp;</div>
                <table cellspacing="0" cellpadding="0" border="0" width="100%">
                <tbody>
                    <tr>
                        <td>
                            <div style="height:12px;line-height:12px;font-size: 12px; ">&nbsp;</div>
                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tbody><tr>
                            <td style="padding-left:60px; text-align:left;">
                            <div style="line-height:21px"><span style="color: #000000;line-height:21px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">Quý nhà đầu tư cần giúp đỡ? Hãy liên lạc với chúng tôi </span></div>
                            <div style="line-height:21px"><span style="color: #00377b;line-height:21px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;font-weight: 700;">Hồ Chí Minh: (+84 8) 3821 6636 - Hà Nội: (+84) 24 6262 6999</span><span style="color: #00377b;line-height:21px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;"> (Ext: 310)</span><span style="color: #000000;line-height:21px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;"> </span></div>
                            <div style="line-height:21px"><span style="color: #000000;line-height:21px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">hoặc qua email </span><span style="color: #00377b;line-height:21px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:14px;text-align:left;">customer.service@vcsc.com.vn</span></div>
                            </td>
                            </tr>
                            </tbody></table>
                        </td>
                    </tr>
                </tbody></table>
                </td>
            </tr>
        <tr>
        <td style="padding-left:60px;padding-right:60px;">
            <div style="height:40px;line-height:40px;font-size: 40px;">&nbsp;</div>
            <table align="center" cellspacing="0" cellpadding="0" border="0" style="margin:auto;">
            <tr>
            <td width="560">
            <table cellpadding="0" cellspacing="0" bgcolor="#ededf2" height="0.99847412109375" width="100%" style="line-height:0.99847412109375px; height:0.99847412109375px!important;background-color:#ededf2; border-collapse:separate !important;margin:0 auto;text-align:center;">
                <tr>
                <td>&nbsp;</td>
                </tr>
            </table>
            </td>
            </tr>
            </table>
        </td>
        </tr>
        <tr>
        <td>
            <div style="height:16px;line-height:16px;font-size: 16px;">&nbsp;</div>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
            <td style="padding-left:60px; text-align:left;">
            <div style="line-height:14px"><span style="color: #00377b;line-height:14px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:10px;text-align:left;font-weight: 700;">CTCP Chứng Khoán Bản Việt (HoSE: VCI)</span></div>
            </td>
            </tr>
            </table>
        </td>
        </tr>
        <tr>
        <td>
            <div style="height:4px;line-height:4px;font-size: 4px;">&nbsp;</div>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
            <td style="padding-left:60px; text-align:left;">
            <div style="line-height:14px"><span style="color: #5f5f5f;line-height:14px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:10px;text-align:left;">Tháp tài chính Bitexco, Lầu 15, 2 Hải Triều , Quận 1, TP. HCM</span></div>
            </td>
            </tr>
            </table>
        </td>
        </tr>
        <tr>
        <td>
            <div style="height:4px;line-height:4px;font-size: 4px;">&nbsp;</div>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
            <td style="padding-left:60px; text-align:left;">
            <div style="line-height:14px"><span style="color: #5f5f5f;line-height:14px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:10px;text-align:left;">Điện thoại : (+84) 28 3914 3588 | Fax : (+84) 28 3914 3209</span></div>
            </td>
            </tr>
            </table>
        </td>
        </tr>
        <tr>
        <td>
            <div style="height:4px;line-height:4px;font-size: 4px;">&nbsp;</div>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
            <td style="padding-left:60px; text-align:left;">
            <div style="line-height:14px"><span style="color: #00377b;line-height:14px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:10px;text-align:left;">www.vcsc.com.vn</span></div>
            </td>
            </tr>
            </table>
        </td>
        </tr>
        <tr>
            <td>
            <div style="height:10px;line-height:4px;font-size: 4px;">&nbsp;</div>
            <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
            <td style="padding-left:60px; text-align:left;">
                <div style="line-height:9px"><span style="color: #999999; width: 100%;line-height:9px;font-family:Arial, Helvetica, Arial, sans-serif; font-size:8px;text-align:left;">
                    DISCLAIMER: The information in this email is confidential. The contents may not be disclosed or used by anyone other than the addressee. If you are not<br> the intended recipient(s), any use, disclosure, copying, distribution or any action taken or omitted to be taken in reliance on it is prohibited and may be unlawful. If<br> you have received this communication in error please notify us by e-mail or by telephone on +84 28 3914 3588 and then delete the e-mail and all attachments<br> and any copies thereof. Viet Capital Securities cannot accept responsibility for the accuracy or completeness of this email as it has been transmitted over a<br> public network. If you suspect that the email may have been intercepted or amended, please call the sender. Any views expressed by an individual in this<br> email do not necessarily reflect views of Viet Capital Securities and/or its subsidiaries and associates. This communication is from Viet Capital Securities a<br> company registered in S.R. Vietnam with registered office at Bitexco Financial Tower, 15th Floor, 2 Hai Trieu Street, District 1, HCMC, Viet Nam
                </span></div>
            </td>
            </tr>
            </table>
            <div style="height:40px;line-height:40px;font-size:40px;">&nbsp;</div>
            </td>
        </tr>
        </table>
        </td>
    </tr>
    </table>
    </div>
    </body>

    </html>
`

exports.name = "mail"