import Pdf from 'react-to-pdf';
import { useRef, useState } from 'react';

export default function App() {
	const [inputValue, setInputValue] = useState({
		note: '',
		date: '',
		issued: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputValue({
			[name]: value,
		});
	};

	const ref = useRef();

	return (
		<div className="App">
			<Pdf targetRef={ref} filename="document.pdf">
				{({ toPdf }) => (
					<button onClick={toPdf} className="button">
						Generate PDF
					</button>
				)}
			</Pdf>

			<div ref={ref}>
				<div id="pspdfkit-header">
					<div className="header-columns">
						<div className="logotype">
							<img className="logo" src="logo.svg" alt="logo" />
							<p>Company</p>
						</div>

						<div>
							<p>[Company Info]</p>
						</div>
					</div>
				</div>

				<div className="page">
					<div>
						<h2>Receipt #</h2>
					</div>

					<div className="intro-table">
						<div className="intro-form intro-form-item">
							<p className="intro-table-title">Billed To:</p>
							<p>
								Company Ltd.
								<br />
								Address
								<br />
								Country
								<br />
								VAT ID: ATU12345678
							</p>
						</div>

						<div className="intro-form">
							<div className="intro-form-item-border">
								<p className="intro-table-title">
									Payment Date:
								</p>
								<p>November 22nd 2021</p>
							</div>

							<div className="intro-form-item-border">
								<p className="intro-table-title">
									Payment Method:
								</p>
								<p>Bank Transfer</p>
							</div>
						</div>
					</div>

					<div className="table-box">
						<table>
							<tbody>
								<tr className="heading">
									<td>Description</td>
									<td>QTY</td>
									<td>Unit Price</td>
									<td>Total</td>
								</tr>

								<tr className="item">
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>

								<tr className="item">
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>

								<tr className="item">
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>

								<tr className="item">
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>

								<tr className="item">
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>

								<tr className="item">
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
							</tbody>
						</table>
					</div>

					<div className="summary-box">
						<table>
							<tbody>
								<tr className="item">
									<td></td>
									<td>Subtotal:</td>
									<td></td>
								</tr>

								<tr className="item">
									<td></td>
									<td>Discount:</td>
									<td></td>
								</tr>

								<tr className="item">
									<td></td>
									<td>Subtotal Less Discount:</td>
									<td></td>
								</tr>

								<tr className="item">
									<td></td>
									<td>Tax Rate:</td>
									<td></td>
								</tr>

								<tr className="item">
									<td></td>
									<td>Total Tax:</td>
									<td></td>
								</tr>

								<tr className="item">
									<td></td>
									<td>Shipping/Handling:</td>
									<td></td>
								</tr>

								<tr className="no-border-item">
									<td></td>
									<td>Total Due:</td>
									<td></td>
								</tr>

								<tr className="total">
									<td></td>
									<td>Amount Paid:</td>
									<td></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div className="page">
					<div>
						<h4>Thank you for your purchase!</h4>
					</div>

					<div className="form">
						<label htmlFor="notes" className="label">
							Notes:
						</label>
						<input
							type="text"
							id="notes"
							className="border-bottom"
							value={inputValue.note}
							onChange={handleChange}
						/>
					</div>

					<div className="signer">
						<div className="form signer-item">
							<label htmlFor="date" className="label">
								Date:
							</label>
							<input
								type="text"
								id="date"
								className="border-bottom"
								value={inputValue.date}
								onChange={handleChange}
							/>
						</div>

						<div className="form signer-item">
							<label htmlFor="signature" className="label">
								Issued by:
							</label>
							<input
								type="text"
								id="signature"
								className="border"
								value={inputValue.issued}
								onChange={handleChange}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}