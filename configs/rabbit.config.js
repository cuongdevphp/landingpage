exports.config = {
    host: 'amqp://localhost',
    email_queue: 'mail_marketing_email_queue',
    person_queue: 'mail_marketing_person_queue',
    contract_queue: 'mail_marketing_contract_queue'
}

exports.name = "rabbit"