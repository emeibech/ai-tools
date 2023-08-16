import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/common/components/ui/accordion";
import { cn } from "@/common/lib/utils";

interface Props {
  className?: string;
}

export default function FAQs(props: Props) {
  return (
    <Accordion type="multiple" className={cn(props.className, "w-full")}>
      <AccordionItem value="faq-1">
        <AccordionTrigger className="text-left text-lg">
          Who exactly are asking these "Frequently Asked Questions?"
        </AccordionTrigger>
        <AccordionContent className="text-card-foreground text-base">
          The people in my head. They're really loud sometimes. And they want
          answers!
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="faq-2">
        <AccordionTrigger className="text-left text-lg">
          What is the point of this app?
        </AccordionTrigger>
        <AccordionContent className="text-card-foreground text-base">
          To apply what I learned in web development so far and to see what I
          can do with OpenAI API.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="faq-3">
        <AccordionTrigger className="text-left text-lg">
          How helpful are these "AI tools?"
        </AccordionTrigger>
        <AccordionContent className="text-card-foreground text-base">
          It depends on what you need them for and how you use them. Right now
          they can answer queries accurately most of the time, meaning not all
          the time. They can write code correctly most of the time if the prompt
          is clear. They can generate text contents (essays, stories, poems,
          songs, etc.) that are not only coherent but sounds like a human wrote
          it. Mileage varies of course. Clear and precise prompts typically
          yields better result.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="faq-4">
        <AccordionTrigger className="text-left text-lg">
          Why should I use these tools? Why not just use ChatGPT?
        </AccordionTrigger>
        <AccordionContent className="text-card-foreground text-base">
          The OpenAI API allows developers to tinker with various settings that
          are not available when just using ChatGPT. The ones I tinker with the
          most are temperature and system content. Temperature gives developers
          control over how deterministic or unpredictable the response is going
          to be, while the system content allows us to give specific
          instructions on exactlty how the AI should respond. Moreover, the free
          tier of ChatGPT uses an older model that is more likely to provide
          erroneous response.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="faq-5">
        <AccordionTrigger className="text-left text-lg">
          What is a large language model?
        </AccordionTrigger>
        <AccordionContent className="text-card-foreground text-base">
          A large language model is a type of artificial intelligence (AI) model
          that is trained on a massive amount of text data. It is designed to
          generate human-like text responses or perform various natural language
          processing tasks. These models use deep learning techniques, such as
          transformers, to understand and generate coherent and contextually
          relevant text. Large language models like OpenAI's GPT-3 (Generative
          Pre-trained Transformer 3) have billions of parameters and can
          understand and generate text in multiple languages, making them highly
          versatile and capable of performing a wide range of language-related
          tasks. This answer is Generated by ChatGPT. If you want to learn more,
          take a look at the infographic below.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
