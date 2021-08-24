import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  files: File[] = [];
  file: any

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    if (this.files.length > 1) {
      this.replaceFile();
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      var url = window.URL.createObjectURL(this.files[0]);
      this.file = this.sanitizer.bypassSecurityTrustUrl(url);
    }
    reader.readAsDataURL(this.files[0])
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  replaceFile() {
    this.files.splice(0, 1);
  }

  modalRef!: BsModalRef;

  constructor(private modalService: BsModalService, private sanitizer: DomSanitizer) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
  }

}
