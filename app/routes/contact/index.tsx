import type { Route } from "./+types";
import { Form } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email") as string;
  const subject = formData.get("subject");
  const message = formData.get("message");

  const errors: Record<string, string> = {};

  if (!name) errors.name = "Name is required";
  if (!email) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid email format";
  }
  if (!subject) errors.subject = "Subject is required";
  if (!message) errors.message = "Message is required";

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const data = {
    name,
    email,
    subject,
    message,
  };
  return { message: "Form Submitted successfully", data };
}

const ContactPage = ({ actionData }: Route.ComponentProps) => {
  const errors = actionData?.errors || {};
  return (
    <div className="max-w-3xl mx-auto mt-12 py-8 bg-gray-900">
      <h2 className="text-3xl font-bold mb-8 text-center">Contact Me</h2>
      <p className="mb-6 bg-green-700 text-green-100 text-center rounded-lg border border-green-500 shadow-md p-4">
        {actionData?.message ? <p>{actionData.message}</p> : null}
      </p>
      <Form method="post" className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-med text-gray-300"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full mt-2 px-4 py-2 border border-gray-700 rounded-lg bg-800 text-gray-100"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-med text-gray-300"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="w-full mt-2 px-4 py-2 border border-gray-700 rounded-lg bg-800 text-gray-100"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-med text-gray-300"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full mt-2 px-4 py-2 border border-gray-700 rounded-lg bg-800 text-gray-100"
          />
          {errors.subject && (
            <p className="text-red-400 text-sm mt-1">{errors.subject}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-med text-gray-300"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full mt-2 px-4 py-2 border border-gray-700 rounded-lg bg-800 text-gray-100"
          />
          {errors.message && (
            <p className="text-red-400 text-sm mt-1">{errors.message}</p>
          )}
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded-large hover:bg-blue-700 cursor-pointer">
          Send Message
        </button>
      </Form>
    </div>
  );
};
export default ContactPage;
