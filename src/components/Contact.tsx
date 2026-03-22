import React, { useState } from 'react';
import './Contact.css';
import contactImage from '../assets/dob2.jpg';
import emailjs from '@emailjs/browser';
import { useReveal } from '../hooks/useReveal';
 
interface FormState {
  firstName: string;
  email: string;
  message: string;
}
 
const revealOptions = { threshold: 0.05, rootMargin: '0px 0px -20px 0px' };
 
export default function Contact(): React.JSX.Element {
  const [form, setForm] = useState<FormState>({ firstName: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState<boolean>(false);
 
  const formRef = useReveal<HTMLDivElement>(revealOptions);
  const imageRef = useReveal<HTMLDivElement>(revealOptions);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    emailjs.send(
      'service_oy3acac',
      'dobromir_contact_form',
      {
        name: form.firstName,
        email: form.email,
        message: form.message,
      },
      'user_MGZK3YXE2haM8nsBL7UMW'
    );
    setSubmitted(true);
  };
 
  return (
    <section className="contact" id="contact">
      <div className="contact__inner">
        <div className="contact__form-col reveal" ref={formRef}>
          <h2 className="section-title contact__heading">Get in Touch</h2>
          <p className="contact__sub">
            For concert and teaching enquiries, album orders, or general enquiries, please get in touch!
          </p>
 
          {submitted ? (
            <p className="contact__thanks">Thanks for submitting! I'll be in touch soon.</p>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__field">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contact__field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contact__field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="contact__submit">Send</button>
            </form>
          )}
        </div>
        <div className="contact__image-col reveal" ref={imageRef}>
          <img
            src={contactImage}
            alt="Piano"
            className="contact__image"
          />
        </div>
      </div>
    </section>
  );
}