import smtplib
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path

from app.core.config import settings


def send_processed_outputs(recipient: str, attachments: dict[str, Path]) -> None:
    if not settings.smtp_user or not settings.smtp_password:
        raise ValueError("SMTP_USER and SMTP_PASSWORD environment variables are required.")

    message = MIMEMultipart()
    message["From"] = settings.smtp_user
    message["To"] = recipient
    message["Subject"] = "Processed Logo Output Results"
    message.attach(
        MIMEText(
            "\n".join(
                [
                    "Hi,",
                    "",
                    "Your logo has been processed by Morphix.",
                    "",
                    "Attachments included:",
                    "- silhouette.png",
                    "- border.png",
                    "- grayscale.png",
                    "",
                    "Morphix",
                ]
            ),
            "plain",
        )
    )

    for output_name, path in attachments.items():
        filename = f"{output_name}.png"
        with path.open("rb") as file_obj:
            part = MIMEApplication(file_obj.read(), Name=filename)
        part["Content-Disposition"] = f'attachment; filename="{filename}"'
        message.attach(part)

    with smtplib.SMTP(settings.smtp_host, settings.smtp_port) as server:
        server.ehlo()
        server.starttls()
        server.login(settings.smtp_user, settings.smtp_password)
        server.sendmail(settings.smtp_user, recipient, message.as_string())
