 #!/bin/bash
 # Default splunk home if not already set
 SPLUNK_HOME=${SPLUNK_HOME-/opt/splunk}
 bump=`cat $SPLUNK_HOME/var/run/splunk/push-version.txt`
 echo "Current version: $bump"
 let bump++
 echo $bump > $SPLUNK_HOME/var/run/splunk/push-version.txt
 echo "New version: $bump"
 echo "Restarting Splunk..."
 $SPLUNK_HOME/bin/splunk restart splunkweb