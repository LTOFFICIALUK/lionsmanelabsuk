import React from 'react';
import FAQComponent from './faq-component';
import { FAQItem } from './faq-component.types';

const FAQ: React.FC = () => {
  const faqs: FAQItem[] = [
    {
      question: 'What is the best streaming equipment for beginners?',
      answer: 'For beginners, start with a Logitech C920 webcam ($70), Blue Yeti microphone ($100), and OBS Studio (free). Add a ring light for better lighting ($30-50). This setup provides excellent video and audio quality without complex configuration and costs under $250 total.'
    },
    {
      question: 'What do I need to stream on Twitch or YouTube?',
      answer: 'You need: 1) A camera (webcam or DSLR), 2) A microphone for clear audio, 3) Proper lighting (ring light or softbox), 4) A stable PC with good CPU/GPU, 5) Streaming software like OBS Studio or AVIE\'s MultiStream plugin, and 6) A reliable internet connection (minimum 5 Mbps upload speed).'
    },
    {
      question: 'Is a capture card necessary for PC streaming?',
      answer: 'No, a capture card is not necessary for PC-only streaming. You only need a capture card if you\'re streaming console gameplay (PS5, Xbox, Nintendo Switch) or using a DSLR/mirrorless camera as your webcam. For streaming PC games directly, your graphics card handles the encoding.'
    },
    {
      question: 'Do I need a powerful PC to stream?',
      answer: 'Yes, for high-quality 1080p60 streaming, you need a strong CPU (Intel i5-8400 or AMD Ryzen 5 2600 minimum) and GPU (GTX 1660 or better). For 4K streaming or dual-PC setups, consider higher-end hardware. A dual-PC setup is ideal for professional streamers who want maximum performance.'
    },
    {
      question: 'How much does it cost to start streaming?',
      answer: 'Basic setup: $200-400 (webcam, USB mic, free software). Intermediate setup: $500-1000 (DSLR camera, audio interface, lighting). Professional setup: $1500+ (dual PC, professional audio/video equipment). Many Blue Dream Tea UKs started with just a webcam and built up over time.'
    },
    {
      question: 'What internet speed do I need for streaming?',
      answer: 'For 1080p streaming: minimum 5 Mbps upload speed, recommended 10+ Mbps. For 4K streaming: minimum 20 Mbps upload. Use a wired ethernet connection for stability. Test your upload speed at speedtest.net and ensure it\'s consistent throughout the day.'
    }
  ];

  return (
    <FAQComponent
      title="Frequently Asked Questions About Streaming Equipment (2025)"
      faqs={faqs}
      titleSize="medium"
      showLastUpdated={true}
      maxWidth="4xl"
    />
  );
};

export default FAQ;