import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: [ 'tab1.page.scss' ]
})
export class Tab1Page implements OnInit {
	itemForm: FormGroup;

	constructor(private barcodeScanner: BarcodeScanner, private fb: FormBuilder) {}

	ngOnInit() {
		this.initForm();
	}

	initForm(data?) {
		let dni: any[] = [];
		if (data) {
			dni = data.text.split('@');
			debugger;
		}

		this.itemForm = this.fb.group({
			nombre: [ data ? dni[1] : '' ],
			apellido: [ data ? dni[2] : '' ],
			dni: [ data ? dni[4] : '' ]
		});
	}

	scan() {
		const options: BarcodeScannerOptions = {
			preferFrontCamera: true,
			showFlipCameraButton: true,
			showTorchButton: true,
			torchOn: false,
			prompt: 'Place a barcode inside the scan area',
			resultDisplayDuration: 500,
			formats: 'QR_CODE,PDF_417 ',
			orientation: 'landscape'
		};

		this.barcodeScanner
			.scan(options)
			.then((barcodeData) => {
				console.log('Barcode data', barcodeData);

				this.initForm(barcodeData);

				alert('QRR: ' + JSON.stringify(barcodeData));
			})
			.catch((err) => {
				console.log('Error', err);
			});
	}
}
