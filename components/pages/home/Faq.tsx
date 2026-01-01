"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslatedList, useTranslation } from "@/context/TranslationClientProvider";

export default () => {
    const faqs = useTranslatedList<{question: string; answer: string}>("faqs.questions");

  return(
    <>
        <Accordion type="multiple">
            {faqs.map((f, i) => <AccordionItem value={`item-${i+1}`} className="border-b-0 mb-2" key={i}>
                <AccordionTrigger className="bg-slate-50 rounded-md px-4 text-lg font-semibold border">{f.question}</AccordionTrigger>
                <AccordionContent className="py-4 px-8 text-lg">{f.answer}</AccordionContent>
            </AccordionItem>)}
        </Accordion>
    </>
  )
}