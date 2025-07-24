import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-generate-answer-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generate-answer-button.html',
  styleUrls: ['./generate-answer-button.scss']
})
export class GenerateAnswerButton {
  @Input() question = '';

  loading = false;
  answer = '';

  constructor(private api: ApiService) {}

  async handleClick(): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) {
      const redirect = encodeURIComponent(location.pathname + location.search);
      location.href = `/login?message=login_required&redirect=${redirect}`;
      return;
    }

    this.loading = true;
    this.answer = '';

    try {
      const res = await this.api
        .post<{ answer: string }>('/ai/generate-answer', { question: this.question })
        .toPromise();

      this.answer = res?.answer || 'No answer generated.';
    } catch (err: any) {
      this.answer = `❌ Error generating answer. ${err?.message || ''}`;
    } finally {
      this.loading = false;
    }
  }
  getAnswerLines(): string[] {
  return (this.answer || '')
    .split('\n')
    .map(line => line.trim())
    .filter(line => !!line);
}

cleanBullet(line: string): string {
  return line.replace(/^[-•]\s*/, '');
}
}
