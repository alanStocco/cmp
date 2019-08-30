import { h, Component } from 'preact';
import style from './vendorList.less';
import style2 from '../../../banner/banner.less';
import detailsStyle from '../details.less';
import ExternalLinkIcon from '../../../externallinkicon/externallinkicon';
import Label from "../../../label/label";
import log from '../../../../lib/log';
import ChevronIcon from '../../../chevronicon/chevronicon';

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'vendors'
	};
}
class PurposesLabel extends Label {
	static defaultProps = {
		prefix: 'purposes'
	};
}

const PANEL_COLLECTED = 0;
const PANEL_PURPOSE = 1;

export default class VendorList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isExpanded: false,
			selectedPanelIndex: 0,
		};
	}

	static defaultProps = {
		vendors: [],
	};


	handleInfo = (index) => () => {
		const { isExpanded, selectedPanelIndex } = this.state;
		this.setState({
			selectedPanelIndex: index,
			isExpanded: index !== selectedPanelIndex || !isExpanded
		});
	};

	renderElementLegPurpose(legPurpose){
		if(legPurpose == 1)
	      return <li >Conservazione e accesso alle informazioni</li>;
	   if (legPurpose == 2) 
	   	   return <li >Personalizzazione</li>;
	   if (legPurpose == 3) 
	   	   return <li >Selezione degli annunci, distribuzione, reporting</li>;
	   if (legPurpose == 4) 
	   	   return <li >Selezione dei contenuti, distribuzione, reporting</li>;
	   if (legPurpose == 5) 
	      return <li >Misurazione</li>;
	   return null;
	}

	renderElementPurpose(purposeIds){
	   //log.debug(`purposeIds ${purposeIds}`);
	   if(purposeIds == 1)
	      return <li >Conservazione e accesso alle informazioni</li>;
	   if (purposeIds == 2) 
	   	   return <li >Personalizzazione</li>;
	   if (purposeIds == 3) 
	   	   return <li >Selezione degli annunci, distribuzione, reporting</li>;
	   if (purposeIds == 4) 
	   	   return <li >Selezione dei contenuti, distribuzione, reporting</li>;
	   if (purposeIds == 5) 
	      return <li >Misurazione</li>;
	   return null;
	}	

	renderElement(elementsIds, index, idType){
	    let buffer = []
		let title = []
	    if(elementsIds.length > 0){
			if(idType == 1 || idType == 2){ //purpose  or legIntPurpose
				if(idType == 1 ){
					title.push( <h4>Finalità:</h4> );
					//log.debug(`ID  ${index}  - purpose ${elementsIds}`);
				}else{ 
					title.push( <h4>Finalità legittimo interesse:</h4> );
					//log.debug(`ID  ${index}  - legIntPurpose ${elementsIds}`);
				}

				for (const [index, element] of elementsIds.entries()) {
		        	//log.debug(`purpose  ${element} `);
		        	if(element == 1)
			      		buffer.push( <li >Conservazione e accesso alle informazioni</li>);	   
				   	if (element == 2) 
				   	   buffer.push( <li >Personalizzazione</li> );		   	
				   	if (element == 3) 
				   	   buffer.push( <li >Selezione degli annunci, distribuzione, reporting</li> );	 
				   	if (element == 4) 
				   	   buffer.push( <li >Selezione dei contenuti, distribuzione, reporting</li> );	
				   	if (element == 5) 
				   	   buffer.push( <li >Misurazione</li> );	
	        	}    
			}		
			if(idType == 3){ //feature
				title.push( <h4>Caratteristiche:</h4> );
				//log.debug(`ID  ${index}  - featureIds ${elementsIds}`);
				for (const [index, element] of elementsIds.entries()) {
		        	//log.debug(`featureIds  ${element} `);
		        	if(element == 1)
			      		buffer.push( <li >Confronto dei dati off-line</li>);	   
				   	if (element == 2) 
				   	   buffer.push( <li >Collegamento dei dispositivi</li> );		   	
				   	if (element == 3) 
				   	   buffer.push(<li >Precisione dei dati di ubicazione geografica</li> );	 
	        	} 
				
			}		
	    }
	             
	    return (
	        <div>
	        	{title}
	        	<ul>
	            {buffer}
	            </ul>
	        </div>
	    );
	   	  
	   //return null;
	}

	renderElementVendors(vendorList ){
		if (vendorList.length > 0) { 
	        return vendorList.map(({name, policyUrl, purposeIds, legIntPurposeIds, featureIds}, index) => (
	            <tr class={index % 2 === 0 ? style.even : style.odd}>
					<td>
						<div class={style.options}>
							<div class={style.company} >
								{name}
								<a href={policyUrl} className={style.policy}  target='_blank'><ExternalLinkIcon /></a>							
								<div>
								 {/* class={[style2.option, selectedPanelIndex === PANEL_COLLECTED && isExpanded ? style.expanded : ''].join(' ')} */} 

									<div
										className={style2.optionDetails}
										
									>																						
										{ this.renderElement(purposeIds, index, 1) }
										
										{ this.renderElement(legIntPurposeIds, index, 2) }
										
										{ this.renderElement(featureIds, index, 3) }
										
									</div>
								</div>
							</div>
						</div>
					</td>
				</tr>
	        ));
	    }
	    else return [];
	}

	render(props, state) {

		const {
			vendors,
			purposes,
			onBack,
			theme,
		} = props;

		const {
			textColor,
			textLightColor,
			textLinkColor
		} = theme;	
		
		const { selectedPanelIndex, isExpanded } = state;

		return (
			<div class={style.vendorList}>
				<div class={style.header}>
					<div class={detailsStyle.title} style={{color: textColor}}>
						<LocalLabel localizeKey='title'>Who is using this information?</LocalLabel>
					</div>
				</div>
				<div class={detailsStyle.description} style={{color: textLightColor}}>
					<LocalLabel localizeKey='description'>Here is the complete list of companies who will use your information. Please view their privacy policy for more details.</LocalLabel>
				</div>
				<a onClick={onBack} style={{color: textLinkColor}} class={style.customize}><LocalLabel localizeKey='back'>Customize how these companies use data from the previous page</LocalLabel></a>
				<table>		

					 { this.renderElementVendors(vendors ) }



				 	{/* A JSX comment    
					{vendors.map(({name, policyUrl, purposeIds, legIntPurposeIds, featureIds}, index) => (
						<tr class={index % 2 === 0 ? style.even : style.odd}>
							<td>
								<div class={style.options}>
									<div class={style.company} style={{color: textLightColor}}>
										{name}

										<a href={policyUrl} className={style.policy} style={{color: textLinkColor}} target='_blank'><ExternalLinkIcon color={textLinkColor} /></a>
										
										<div
										class={[style2.option, selectedPanelIndex === PANEL_COLLECTED && isExpanded ? style.expanded : ''].join(' ')}>
											{// A JSX comment 
											 //<a
											//	onClick={this.handleInfo(PANEL_COLLECTED)}
											//	class={style2.detailExpand}
											//>
											//	<ChevronIcon color={textLinkColor}/>
											//	<LocalLabel >Ulteriori informazioni
											//	</LocalLabel>
											//</a>
											}
											<div
												className={style2.optionDetails}
												style={{ color: textLightColor }}
											>		
												{purposeIds}
												{legIntPurposeIds}
												{featureIds}
												<h4>Purposes:</h4>																
												<ul>
												  { this.renderElementPurpose(purposeIds) }
												</ul>
												<h4>Legitimale Interest Purposes:</h4>																
												<ul>
												  { this.renderElementLegPurpose(legIntPurposeIds) }
												</ul>
												<h4>Features:</h4>																
												<ul>
												  { this.renderElementFeature(featureIds) }
												</ul>
											</div>
										</div>
									</div>
								</div>
							</td>
						</tr>
					))}
					*/}
				</table>
			</div>
		);
	}
}
