import MailchimpSubscribe from "react-mailchimp-subscribe";
import NewsletterForm from "./NewsLetterForm";

const OurForm = () => {
  const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP;

  return (
    <MailchimpSubscribe
      url={MAILCHIMP_URL}
      render={(props) => {
        const { subscribe, status, message } = props || {};
        return (
          <NewsletterForm
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
          />
        );
      }}
    />
  );
};

export default OurForm;
