import java.io.*;
import java.util.*;

public class ProductReviewBuilder{

   public static void main(String args[])throws IOException{

      File inputFile = new File("amazon-meta.txt");
      File outputFile = new File("Review.txt");

      outputFile.createNewFile();

      BufferedReader myBufferedReader = new BufferedReader(new java.io.FileReader(inputFile));
      BufferedWriter myBufferedWriter = new BufferedWriter(new FileWriter(outputFile));
      String currentLine;
      String stringToBeWritten="";
      StringTokenizer myStringTokenizer;
      int reviewCount = 0;
      String currentId = null;
   
      while((currentLine = myBufferedReader.readLine())!=null) {

         if(currentLine.contains("Id:")) {
            currentId = currentLine.substring(currentLine.lastIndexOf(" "));
         }
         
         if(currentLine.contains("reviews:")) {
         String[] stringWords = currentLine.split(" ");
         reviewCount = Integer.parseInt(stringWords[4]);
         }
         
         if(currentLine.contains("cutomer:") && currentLine.contains("rating:") && currentLine.contains("helpful:")) {
             currentLine = currentLine.replaceAll("\\s+", " "); 
             String[] reviewWords = currentLine.split(" ");
             stringToBeWritten = currentId+"\t" +reviewWords[1]+"\t"+reviewWords[3]+"\t"+reviewWords[5]+"\t"+reviewWords[7]+"\t"+reviewWords[9];
             System.out.println(stringToBeWritten);
             myBufferedWriter.write(stringToBeWritten);
             myBufferedWriter.newLine();
          
             
         }
         
      }

      myBufferedReader.close();
      myBufferedWriter.close();
   }
}