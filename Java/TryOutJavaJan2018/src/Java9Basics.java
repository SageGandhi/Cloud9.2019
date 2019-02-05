public class Java9Basics {
    public static void main(String... arguments) {
        System.out.println("Starting Java 9+11 In January 2019");
        /*
        Do set JAVA_HOME="C:\Program Files\Java\jdk-11.0.1" And set PATH=%JAVA_HOME%\bin;%PATH% In Terminal
        Ctrl+Alt+Shift+S For Project Structure & Ctrl+Alt+S For Settings
        Change Editor->General->Auto Import/Appearances/Code Folding
        View->Tool Windows,Window->Store Current Layout As Default & Restore Default Layout,
        Code->Reformat Code[Ctrl+Alt+L]
        */
        //https://unicode-table.com/en/#control-character
        //Use DiffMerge:https://sourcegear.com/diffmerge/
        System.out.println("CorporateRegistered:\u08a9\u00ae");
        //For Loop With Floating Value Possible
        //Integer.valueOf[AutoBoxing]/intValue[AutoUnBoxingEET]
    }
}
/*
Covariant Return Type:When Overridden Method Returns SubType/SubClasses Of The Return Type
class First {}
class Second extends First {}
abstract class Factory {abstract First createInstance();}
abstract class OtherFactory extends Factory {abstract Second createInstance();}
*/
