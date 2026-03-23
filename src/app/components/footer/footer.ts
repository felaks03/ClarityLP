import { Component, inject, OnInit } from '@angular/core';
import { GithubReleaseService } from '../../services/github-release.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent implements OnInit {
  private releaseService = inject(GithubReleaseService);

  scrollToRiesgos(event: Event) {
    event.preventDefault();
    document.getElementById('riesgos')?.scrollIntoView({ behavior: 'smooth' });
  }

  year = new Date().getFullYear();
  version = '';

  ngOnInit() {
    this.releaseService.getLatestRelease().subscribe((release) => {
      if (release) this.version = release.version;
    });
  }
}
