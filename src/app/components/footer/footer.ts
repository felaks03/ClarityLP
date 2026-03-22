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

  year = new Date().getFullYear();
  version = '';

  ngOnInit() {
    this.releaseService.getLatestRelease().subscribe((release) => {
      if (release) this.version = release.version;
    });
  }
}
