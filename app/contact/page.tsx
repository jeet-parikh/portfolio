import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm always interested in new opportunities and collaborations.
            Whether you have a project in mind or just want to chat about
            technology, feel free to reach out!
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
