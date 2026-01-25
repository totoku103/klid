/**
 * Program Name		: RoutingDataSource.java
 * Description		: 
 * Programmer Name 	: Bae Jung Yeo
 * Creation Date	: 2017. 4. 10.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.common;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

/**
 * @author jjung
 *
 */
public class RoutingDataSource extends AbstractRoutingDataSource {

	@Override
	protected Object determineCurrentLookupKey() {
		return ContextHolder.getDataSourceType();
	}

}
