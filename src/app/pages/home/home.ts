import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  // Data for the features section
  features = [
    {
      title: 'AI-Powered Insights',
      description: 'Get intelligent analysis of interview questions and personalized preparation tips based on real experiences.',
    },
    {
      title: 'Real Experiences',
      description: 'Access thousands of authentic interview stories from professionals across different companies and roles.',
    },
    {
      title: 'Company Insights',
      description: 'Filter experiences by specific companies, roles, and interview types to get targeted preparation.',
    },
  ];

  // Data for the "How it Works" section
  steps = [
    {
      title: 'Share Your Experience',
      description: 'Submit your interview story with details about the company, role, and questions asked.',
    },
    {
      title: 'AI Analysis',
      description: 'Our AI analyzes your experience and generates insights for future candidates.',
    },
    {
      title: 'Help Others Succeed',
      description: 'Your story helps others prepare better and increases their chances of success.',
    },
  ];

  // Data for the testimonials section
  testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer at Meta',
      content: 'InterviewShare helped me understand what to expect at Meta. The AI insights were incredibly accurate and helped me prepare the right way.',
    },
    {
      name: 'Michael Rodriguez',
      role: 'Product Manager at Google',
      content: 'The real interview experiences gave me confidence and the exact preparation strategy I needed. Landed my dream job!',
    },
    {
      name: 'Emily Johnson',
      role: 'Data Scientist at Netflix',
      content: 'Amazing platform! The AI-generated practice questions were spot-on with what I faced in my actual Netflix interview.',
    },
  ];
}