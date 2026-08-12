# FE-03 prompts evidence

## Round 1 — vague prompt

"Build a React contact form"

## Round 2 — precise prompt

"I want you to read it first. Don't send it yet. Build a React contact form for a business website. Before coding, inspect the existing project structure and briefly explain your implementation plan. Use a single `ContactForm` component for this small feature and Tailwind CSS for styling. The form must contain four required fields:

- Full Name
- Email
- Phone Number
- Message

Validation requirements:

- Full Name: required and minimum 2 characters. Do not allow numbers in the name. Names may contain spaces and letters from different languages.
- Email: required and must be a valid email address containing `@` and a valid domain.
- Phone Number: required. Allow digits, spaces, and international country codes such as `+234`.
- Message: required, minimum 20 characters and maximum 1000 characters.

User experience:

- Show clear, friendly validation errors next to the relevant field.
- Preserve the user's entered values when validation fails.
- While submitting, disable the submit button and show a loading state.
- On successful submission, show: "Thanks for contacting us! We'll get back to you within 24 hours."
- Keep the user on the same page after successful submission.
- If submission fails, show a friendly error message, preserve all entered values, and re-enable the submit button so the user can try again.

Accessibility:

- Every field must have an associated label.
- Use appropriate input types and accessible error messaging.
- Ensure the form can be operated with a keyboard.

For this assignment, simulate the submission rather than connecting to a real backend. After implementing the feature, verify it against every requirement above. Test the validation and submission states, identify any problems you find, fix them, and then summarize what you verified."

## Independent rounds

The two rounds were performed independently on separate branches and sessions.

## Workflow note

Round 2 used an inspect → plan → implement → verify workflow.

## Verification mistake caught

The verification caught a real AI mistake: successful submission initially displayed the success state but did not clear the submitted field values, which was then fixed and re-verified.
